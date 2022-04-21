/* eslint-disable @typescript-eslint/naming-convention */
import { Context } from "../context";
import { request } from "undici";
import { HttpMethod } from "undici/types/dispatcher";

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
  const token = await context.getToken();
  const response = await request(
    `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
    {
      method: method.toUpperCase() as HttpMethod,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    }
  );
  // if (!response.) {
  //   // TODO validate & parse the error to fit the generated error types
  //   throw new Error("Network response was not ok");
  // }
  return await response.body.json();
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
