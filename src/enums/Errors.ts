/**
 * The different types of http status codes
 *
 * @internal
 */
export enum EHttpStatus {
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	REQUEST_TIMEOUT = 408,
	TOO_MANY_REQUESTS = 429,
	INTERNAL_SERVER_ERROR = 500,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
}

/**
 * Different types of error messages related to authentication returned by services.
 *
 * @public
 */
export enum EAuthenticationErrors {
	NOT_AUTHENTICATED = 'Cannot fetch this data without authentication',
	INVALID_EMAIL = 'No Twitter account found for the given email address',
	INVALID_USERNAME = 'Incorrect username given for the given Twitter account',
	INVALID_PASSWORD = 'Incorrect password given for the given Twitter account',
}
