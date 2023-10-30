// PACKAGES
import { Cookie, CookieJar } from 'cookiejar';

// TYPES
import { IAuthCookie } from '../types/AuthCookie';

/**
 * The cookie containing the tokens that are used to authenticate against Twitter.
 *
 * @internal
 */
export class AuthCookie implements IAuthCookie {
	/* eslint-disable @typescript-eslint/naming-convention */
	/** Token used to authenticate a device. */
	public kdt: string = '';

	/** Token used to authenticate a user using a Twitter ID. */
	public twid: string = '';

	/** The CSRF token of the session. */
	public ct0: string = '';

	/** The authentication token used while logging in to the account. */
	public auth_token: string = '';
	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * Creates a new AuthCookie object from the given cookie string.
	 *
	 * @param cookieStr - The cookie string list obtained from set-cookie header.
	 */
	public constructor(cookieStr: string[]) {
		// Storing the cookies in cookie jar
		const cookies: Cookie[] = new CookieJar().setCookies(cookieStr);

		// Parsing the cookies
		for (const cookie of cookies) {
			if (cookie.name == 'kdt') {
				this.kdt = cookie.value;
			} else if (cookie.name == 'twid') {
				this.twid = cookie.value;
			} else if (cookie.name == 'ct0') {
				this.ct0 = cookie.value;
			} else if (cookie.name == 'auth_token') {
				this.auth_token = cookie.value;
			}
		}
	}

	/**
	 * Converts 'this' object to it's string representation.
	 */
	public toString(): string {
		/** The string representation of 'this' object. */
		let outStr: string = '';

		// Iterating through the (key, value) pairs of this cookie
		for (const [key, value] of Object.entries(this)) {
			outStr += `${key}=${value as string};`;
		}

		return outStr;
	}
}
