/**
 * The cookie containing the tokens that are used to authenticate against Twitter.
 *
 * @internal
 */
export interface IAuthCookie {
	/* eslint-disable */
	/** Token used to authenticate a device. */
	kdt: string;

	/** Token used to authenticate a user using a Twitter ID. */
	twid: string;

	/** The CSRF token of the session. */
	ct0: string;

	/** The authentication token used while logging in to the account. */
	auth_token: string;
	/* eslint-enable */
}
