/**
 * The authentication credentials in header form that can be used for authenticating against Twitter.
 *
 * @internal
 */
export interface IAuthHeader {
	/* eslint-disable */
	/** The bearer token from twitter.com. */
	'authorization'?: string;

	/** The guest token provided by Twitter API. */
	'x-guest-token'?: string;

	/** The csrf token for the session. */
	'x-csrf-token'?: string;

	/** The cookie of the twitter account, which is used to authenticate against twitter. */
	'cookie'?: string;
	/* eslint-enable */
}
