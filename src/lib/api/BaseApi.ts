import { ApiError } from './errors';

export type HttpMethod = 'GET' | 'POST';

export type RequestBody = object | null | undefined;

export type QueryParams = Record<string, number | string | null | undefined>;

export interface RequestOptions {
  body?: RequestBody;
  headers?: Record<string, string>;
  method?: HttpMethod;
  // Appended as the query string; empty values are skipped.
  params?: QueryParams;
}

const withQuery = (url: string, params: QueryParams = {}): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') query.append(key, String(value));
  });
  const search = query.toString();
  return search ? `${url}?${search}` : url;
};

class BaseApi {
  get url(): string {
    const baseURL = import.meta.env.VITE_MOVIE_SEARCH_BLOG_API_URL;
    if (!baseURL) {
      throw new Error('VITE_MOVIE_SEARCH_BLOG_API_URL não está definido nas variáveis de ambiente.');
    }
    return baseURL.replace(/\/+$/, '');
  }

  // Every failed request leaves here as an ApiError, so callers never deal
  // with fetch errors or non-ok responses directly.
  async fetch<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, method = 'GET', params } = options;
    const hasBody = body !== null && body !== undefined;

    try {
      const response = await fetch(`${this.url}/${withQuery(url, params)}`, {
        body: hasBody ? JSON.stringify(body) : undefined,
        headers: hasBody ? { 'Content-Type': 'application/json', ...headers } : headers,
        method,
      });
      const text = await response.text();
      if (!response.ok) throw ApiError.fromResponse(response.status, text);
      const isJson = response.headers.get('content-type')?.includes('application/json');
      return (isJson && text ? JSON.parse(text) : text) as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      // Network failure, backend offline, CORS, etc.
      throw new ApiError(error instanceof Error ? error.message : 'Unexpected error', 0);
    }
  }

  get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.fetch<T>(url, { ...options, method: 'GET' });
  }

  post<T>(url: string, body?: RequestBody, options: RequestOptions = {}): Promise<T> {
    return this.fetch<T>(url, { ...options, body, method: 'POST' });
  }
}

export default new BaseApi();
