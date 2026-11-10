// Error thrown by BaseApi for every failed request. The backend answers
// { data: '<message>' } on most errors and { message } when Mongo is down, so
// the readable message is extracted from either field.
export class ApiError extends Error {
  body: unknown;
  status: number;

  constructor(message: string, status = 0, body: unknown = null) {
    super(message);
    this.name = 'ApiError';
    this.body = body;
    this.status = status;
  }

  // BaseApi hands over the raw response text, which is parsed here when it is
  // JSON and kept as-is when the backend answers plain text.
  static fromResponse(status: number, rawBody: string): ApiError {
    let body: unknown = rawBody;
    try {
      body = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      body = rawBody;
    }
    const { data, message } = (body ?? {}) as { data?: unknown; message?: unknown };
    const readable =
      typeof data === 'string' ? data : typeof message === 'string' ? message : `HTTP error ${status}`;
    return new ApiError(readable, status, body);
  }
}

// Serializable shape stored in redux via rejectWithValue.
export interface ApiErrorPayload {
  message: string;
  status?: number;
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

// A movie without blog post or review answers 404, which is not a failure.
export const nullIfNotFound = async <T>(request: Promise<T>): Promise<T | null> => {
  try {
    return await request;
  } catch (error) {
    if (isApiError(error) && error.status === 404) return null;
    throw error;
  }
};

// The blog is public, so readers always get the friendly pt-BR fallback; the
// backend message stays on the ApiError for debugging.
export const toApiErrorPayload = (error: unknown, fallback: string): ApiErrorPayload => ({
  message: fallback,
  status: isApiError(error) ? error.status : undefined,
});
