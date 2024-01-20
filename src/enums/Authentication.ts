/**
 * The different types of authentication for authenticating against Twitter.
 */
export enum EAuthenticationType {
	GUEST = 'GUEST',
	USER = 'USER',
	LOGIN = 'LOGIN',
}

/**
 * Different types of error messages related to authentication returned by services.
 */
export enum EAuthenticationErrors {
	NOT_AUTHENTICATED = 'Cannot fetch this data without authentication',
	INVALID_EMAIL = 'No Twitter account found for the given email address',
	INVALID_USERNAME = 'Incorrect username given for the given Twitter account',
	INVALID_PASSWORD = 'Incorrect password given for the given Twitter account',
	AUTHENTICATION_FAILED = 'Failed to authenticate using the given account Credentials',
}
