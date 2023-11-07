// TYPES
import { IAuthHeader } from '../types/AuthHeader';

// MODELS
import { AuthCredential } from './AuthCredential';

/**
 * The authentication credentials in header form that can be used for authenticating against Twitter.
 *
 * @public
 */
export class AuthHeader implements IAuthHeader {
	/* eslint-disable @typescript-eslint/naming-convention */
	public 'authorization'?: string;
	public 'x-guest-token'?: string;
	public 'x-csrf-token'?: string;
	public 'cookie'?: string;
	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * Creates a new instance from the given AuthCredential object.
	 *
	 * @param cred - The AuthCredential from which to generate headers.
	 *
	 * @internal
	 */
	public 'constructor'(cred: AuthCredential) {
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
