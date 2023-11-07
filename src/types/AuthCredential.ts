// ENUMS
import { EAuthenticationType } from '../enums/Authentication';

/**
 * The credentials for authenticating against Twitter.
 *
 * @internal
 */
export interface IAuthCredential {
	/** The bearer token from twitter.com. */
	authToken?: string;

	/** The guest token provided by Twitter API. */
	guestToken?: string;

	/** The CSRF token for the session. */
	csrfToken?: string;

	/** The cookie of the twitter account, which is used to authenticate against twitter. */
	cookie?: string;

	/** The types of authentication. */
	authenticationType?: EAuthenticationType;
}
