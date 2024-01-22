// MODELS
import { AuthCredential } from './AuthCredential';

/**
 * The authentication credentials in header form that can be used for authenticating against Twitter.
 */
export class AuthHeader {
	/* eslint-disable @typescript-eslint/naming-convention */

	/** The bearer token from twitter.com. */
	public authorization?: string;

	/** The guest token provided by Twitter API. */
	public 'x-guest-token'?: string;

	/** The csrf token for the session. */
	public 'x-csrf-token'?: string;

	/** The cookie of the twitter account, which is used to authenticate against twitter. */
	public cookie?: string;

	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * @param cred - The AuthCredential from which to generate headers.
	 */
	public constructor(cred: AuthCredential) {
		/**
		 * Conditionally initializing only those data which are supplied.
		 *
		 * This is done to ensure that the data that is not supplied, is not included in output, not even undefined.
		 */
		if (cred.authToken) {
			this.authorization = `Bearer ${cred.authToken}`;
		}
		if (cred.guestToken) {
			this['x-guest-token'] = cred.guestToken;
		}
		if (cred.csrfToken) {
			this['x-csrf-token'] = cred.csrfToken;
		}
		if (cred.cookies) {
			this.cookie = cred.cookies;
		}
	}
}
