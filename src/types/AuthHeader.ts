/**
 * The headers that are used for authenticating against Twitter API.
 *
 * @public
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
