// TYPES
import { IAuthHeader } from '../types/AuthHeader';

// MODELS
import { AuthCredential } from './AuthCredential';

/**
 * The headers that are used for authenticating against Twitter API.
 *
 * @public
 */
export class AuthHeader implements IAuthHeader {
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

	/**
	 * Creates a new instance from the given AuthCredential object.
	 *
	 * @param cred The AuthCredential from which to generate headers.
	 */
	'constructor'(cred: AuthCredential) {
		/**
		 * Conditionally initializing only those data which are supplied.
		 *
		 * This is done to ensure that the data that is not supplied, is not included in output, not even undefined.
		 */
		if (cred.authToken) {
			this['authorization'] = `Bearer ${cred.authToken}`;
		}
		if (cred.guestToken) {
			this['x-guest-token'] = cred.guestToken;
		}
		if (cred.csrfToken) {
			this['x-csrf-token'] = cred.csrfToken;
		}
		if (cred.cookies) {
			this['cookie'] = cred.cookies;
		}
	}
}
