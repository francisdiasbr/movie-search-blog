interface RequestOptions extends RequestInit {
  headers: Record<string, string>;
  method: string;
  body?: string;
}

class BaseService {
  private baseURL: string;

  constructor() {
    this.baseURL = 'https://the-movie-search-app-638de9ab055f.herokuapp.com/api';
    // this.baseURL = 'http://192.168.15.11:5000/api';
  }

  async delete<T>(endpoint: string, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', null, headers);
  }

  async get<T>(endpoint: string, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, 'GET', null, headers);
  }

  async post<T>(endpoint: string, body: unknown, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, 'POST', body, headers);
  }

  async put<T>(endpoint: string, body: unknown = null, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, 'PUT', body, headers);
  }

  private async request<T>(
    endpoint: string, 
    method: string, 
    body: unknown = null, 
    extra_headers: Record<string, string> = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const options: RequestOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...extra_headers,
      },
      method,
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      
      console.log('API Response:', {
        status: response.status,
        url,
        method,
        response
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const error = new Error(`HTTP error! status: ${response.status}`) as Error & { 
          response: Response;
          data?: unknown;
        };
        error.response = response;
        error.data = errorData;
        throw error;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Response data:', data);
        return data;
      }
      return response.statusText as T;
    } catch (error) {
      console.error(
        `API call error with ${method} request from url ${url}:`,
        error
      );
      throw error;
    }
  }
}

export default new BaseService(); 