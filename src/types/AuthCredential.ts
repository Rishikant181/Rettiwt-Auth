// ENUMS
import { EAuthenticationType } from '../enums/Authentication';

/**
 * The credentials for authenticating against Twitter.
 *
 * @public
 */
export interface IAuthCredential {
	/**
	 * The bearer token from twitter.com.
	 *
	 * @internal
	 */
	authToken?: string;

	/**
	 * The guest token provided by Twitter API.
	 *
	 * @internal
	 */
	guestToken?: string;

	/**
	 * The CSRF token for the session.
	 *
	 * @internal
	 */
	csrfToken?: string;

	/**
	 * The cookie of the twitter account, which is used to authenticate against twitter.
	 *
	 * @internal
	 */
	cookie?: string;

	/** The types of credential. */
	authenticationType?: EAuthenticationType;
}
