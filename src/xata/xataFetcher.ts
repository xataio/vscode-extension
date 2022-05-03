/* eslint-disable @typescript-eslint/naming-convention */
import { Context } from "../context";

export type XataFetcherExtraProps = {
  baseUrl: string;
  context: Context;
};

export type XataFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
  url: string;
  method: string;
  body?: TBody;
  headers?: THeaders;
  queryParams?: TQueryParams;
  pathParams?: TPathParams;
} & XataFetcherExtraProps;

export async function xataFetch<
  TData,
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
  context,
  baseUrl,
}: XataFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  try {
    // Deal with `fetch` between browser/electron context
    // Note: `cross-fetch` and other similar packages are not working in this context.
    const crossFetch =
      process.env.VSCODE_ENV === "browser"
        ? fetch
        : (await import("node-fetch")).default;

    const token = await context.getToken();
    const response = await crossFetch(
      `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
      {
        method: method.toUpperCase(),
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...headers,
        },
      }
    );

    if (response.status === 401) {
      throw new Error("Xata: Invalid token");
    }

    if (response.status === 204 /* no content */) {
      return undefined as any as TData;
    }

    if (!response.status.toString().startsWith("2")) {
      const details = ((await response.json()) as any).message;
      throw new ValidationError(`Xata: Network error (${details}})`, details);
    }

    return (await response.json()) as TData;
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
  if (query) {
    query = `?${query}`;
  }
  return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)]) + query;
};

export class ValidationError extends Error {
  constructor(public message: string, public details: string) {
    super(message);
  }
}
