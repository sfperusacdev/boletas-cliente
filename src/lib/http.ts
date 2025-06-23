import { customFetch } from "../utils/customFetch";
import { joinUrls } from "../utils/url";
import { ApiError, InternetError, SyntaxJsonError } from "../utils/errors";
// import { emmitCloseSession } from "../utils/session";
import { API_BOLETAS_URL } from "../config/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions<B = unknown> = {
  baseUrl?: string;
  path: string;
  method: HttpMethod;
  body?: B;
  abortSignal?: AbortSignal;
  fullResponse?: boolean;
};

const request = async <T, B = unknown>({
  baseUrl,
  path,
  method,
  body,
  abortSignal,
  fullResponse = false,
}: RequestOptions<B>): Promise<T> => {
  const response = await customFetch(
    joinUrls(baseUrl ?? API_BOLETAS_URL, path),
    {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: abortSignal,
    },
  );

  const decoded = await response.json();

  if (!response.ok) {
    const message =
      typeof decoded?.message === "string"
        ? decoded.message
        : "Unexpected error";
    // if (message.includes("[close]")) emmitCloseSession(); // TODO
    throw new ApiError(message);
  }

  return fullResponse ? (decoded as T) : (decoded.data as T);
};

// Exported API

export const download = async <B>(options: {
  baseUrl?: string;
  path: string;
  method?: HttpMethod;
  body?: B;
  abortSignal?: AbortSignal;
  progress: (progress: number) => void;
}) => {
  try {
    const response = await customFetch(
      joinUrls(options.baseUrl ?? API_BOLETAS_URL, options.path),
      {
        method: options.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
        },
        ...(options.body ? { body: JSON.stringify(options.body) } : {}),
        signal: options.abortSignal,
      },
    );

    if (!response.ok) {
      const decoded = await response.json();
      const message =
        typeof decoded?.message === "string"
          ? decoded.message
          : "Unexpected error";
      // if (message.includes("[close]")) emmitCloseSession(); // TODO
      throw new ApiError(message);
    }

    const body = response.body;
    if (!body) throw new ApiError("Archivo no encontrado");
    const reader = body.getReader();
    const contentLength = parseInt(
      response.headers.get("Content-Length") ?? "",
    );
    let receivedLength = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) break;
      chunks.push(chunk);
      receivedLength += chunk.length;
      options.progress(Math.round((receivedLength / contentLength) * 100));
    }
    return new Blob(chunks);
  } catch (e) {
    if (e instanceof SyntaxError) throw new SyntaxJsonError();
    if (e instanceof TypeError) throw new InternetError();
    throw e;
  }
};

export const get = <T>(options: Omit<RequestOptions, "method" | "body">) =>
  request<T>({ ...options, method: "GET" });

export const post = <T, B = unknown>(
  options: Omit<RequestOptions<B>, "method">,
) => request<T, B>({ ...options, method: "POST" });

export const put = <T, B = unknown>(
  options: Omit<RequestOptions<B>, "method">,
) => request<T, B>({ ...options, method: "PUT" });

export const patch = <T, B = unknown>(
  options: Omit<RequestOptions<B>, "method">,
) => request<T, B>({ ...options, method: "PATCH" });

export const del = <T>(options: Omit<RequestOptions, "method" | "body">) =>
  request<T>({ ...options, method: "DELETE" });

// region FormData

export const postFromData = async ({
  baseUrl,
  path,
  body,
  method = "POST",
  abortSignal,
}: Omit<RequestOptions, "method"> & {
  body: FormData;
  method?: "POST" | "PUT";
}): Promise<unknown> => {
  const response = await customFetch(
    joinUrls(baseUrl ?? API_BOLETAS_URL, path),
    {
      method,
      body,
      signal: abortSignal,
    },
  );

  const decoded = await response.json();
  if (!response.ok) {
    const message = decoded.message as string;
    throw new ApiError(message);
  }
  return decoded.data;
};
