import { Context } from "../context";
import * as vscode from "vscode";

export type XataWorkspaceFetcherExtraProps = {
  context: Context;
  token?: string;
  silentError?: boolean;
  workspaceId: string;
  regionId: string;
  baseUrl?: string;
};

export type ErrorWrapper<TError> = TError;

export type XataWorkspaceFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
> = {
  url: string;
  method: string;
  body?: TBody;
  headers?: THeaders;
  queryParams?: TQueryParams;
  pathParams?: TPathParams;
} & XataWorkspaceFetcherExtraProps;

export async function xataWorkspaceFetch<
  TData,
  TError,
  TBody extends {} | undefined | null,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {}
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
  token,
  silentError,
  context,
  workspaceId,
  regionId,
  baseUrl,
}: XataWorkspaceFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<
  | { success: true; data: TData }
  | { success: false; error: ErrorWrapper<TError> }
> {
  try {
    // Deal with `fetch` between browser/electron context
    // Note: `cross-fetch` and other similar packages are not working in this context.
    const crossFetch =
      process.env.VSCODE_ENV === "browser"
        ? fetch
        : (await import("node-fetch")).default;

    if (!token) {
      token = await context.getToken();
    }

    baseUrl =
      baseUrl ??
      context
        .getWorkspaceBaseUrl()
        .replace("{workspaceId}", workspaceId)
        .replace("{regionId}", regionId);

    const response = await crossFetch(
      `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
      {
        method: method.toUpperCase(),
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          "Content-Type": "application/json",
          "X-Xata-Agent": "service=vscode-extension",
          Authorization: `Bearer ${token}`,
          ...headers,
        },
      }
    );
    if (response.status === 401) {
      throw new Error("Xata: Invalid token");
    }

    if (response.status === 204 /* no content */) {
      return { success: true, data: undefined as any };
    }

    if (!response.status.toString().startsWith("2")) {
      const payload = await response.json();

      if (response.status === 400 && !silentError) {
        vscode.window.showErrorMessage(payload.message);
      }

      return {
        success: false,
        error: {
          status: response.status,
          payload,
        } as any,
      };
    }

    return { success: true, data: (await response.json()) as any };
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOTFOUND") {
      context.setOffline(true);
      throw new Error("Xata: You are offline");
    }
    throw e;
  }
}

const resolveUrl = (
  url: string,
  queryParams: Record<string, string> = {},
  pathParams: Record<string, string> = {}
) => {
  let query = new URLSearchParams(queryParams).toString();
  if (query) query = `?${query}`;
  return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)]) + query;
};
