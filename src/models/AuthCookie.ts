// TYPES
import { IAuthCookie } from '../types/AuthCookie';

/**
 * The cookie containing the tokens that are used to authenticate against Twitter.
 *
 * @public
 */
export class AuthCookie implements IAuthCookie {
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

	/**
	 * Creates a new AuthCookie object from the given cookie string.
	 *
	 * @param cookie The cookie string containing all the required cookies.
	 */
	constructor(cookie: string) {
		this.auth_token = '';
		this.ct0 = '';
		this.kdt = '';
		this.twid = '';
	}

	/**
	 * Converts 'this' object to it's string representation.
	 */
	toString(): string {
		/** The string representation of 'this' object. */
		let outStr: string = '';

		// Iterating through the (key, value) pairs of this cookie
		for (const [key, value] of Object.entries(this)) {
			outStr += `${key}=${value as string};`;
		}

		return outStr;
	}
}
