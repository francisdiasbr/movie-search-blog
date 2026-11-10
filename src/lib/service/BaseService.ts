import api, { RequestBody, RequestOptions } from '../api/BaseApi';

// Base for every feature service. Subclasses set `prefix` (the resource path
// under VITE_MOVIE_SEARCH_BLOG_API_URL) and expose methods named after the
// business operation. No URL should be built outside a service.
abstract class BaseService {
  protected abstract prefix: string;

  protected path(...segments: Array<number | string | null | undefined>): string {
    return [this.prefix, ...segments]
      .filter(segment => segment !== null && segment !== undefined && segment !== '')
      .map(segment => encodeURIComponent(String(segment)))
      .join('/');
  }

  get<T>(id?: number | string, prefix = this.prefix, options?: RequestOptions): Promise<T> {
    const url = id !== undefined && id !== null && id !== '' ? `${prefix}/${encodeURIComponent(String(id))}` : prefix;
    return api.get<T>(url, options);
  }

  post<T>(body?: RequestBody, prefix = this.prefix, options?: RequestOptions): Promise<T> {
    return api.post<T>(prefix, body, options);
  }
}

export default BaseService;
