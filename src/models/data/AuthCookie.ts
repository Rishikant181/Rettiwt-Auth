// PACKAGES
import { Cookie, CookieJar } from 'cookiejar';

/**
 * The cookie containing the tokens that are used to authenticate against Twitter.
 */
export class AuthCookie {
	/* eslint-disable @typescript-eslint/naming-convention */

	/** Token used to authenticate a device. */
	public kdt: string = '';

	/** Token used to authenticate a user using a Twitter ID. */
	public twid: string = '';

	/** The CSRF token for the session. */
	public ct0: string = '';

	/** The bearer token from twitter.com. */
	public auth_token: string = '';

	/* eslint-enable @typescript-eslint/naming-convention */

	/**
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
	 * @returns the string representation of 'this' object.
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
