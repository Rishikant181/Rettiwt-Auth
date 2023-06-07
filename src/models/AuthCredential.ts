// ENUMS
import { ECredentialType } from '../enums/Authentication';

// TYPES
import { IAuthCredential } from '../types/AuthCredential';

// MODELS
import { AuthCookie } from './AuthCookie';

/**
 * The credentials for authenticating against Twitter.
 *
 * Depending on which tokens are present, the authentication type is determined as follows:
 * - authToken, guestToken => Guest authentication.
 * - authToken, csrfToken, cookie => User authentication.
 * - authToken, guestToken, cookie => Guest authentication while logging in.
 *
 * @public
 */
export class AuthCredential implements IAuthCredential {
	/** The bearer token from twitter.com. */
	authToken?: string;

	/** The guest token provided by Twitter API. */
	guestToken?: string;

	/** The guest token. */
	csrfToken?: string;

	/** The cookie of the twitter account, which is used to authenticate against twitter. */
	cookie?: string;

	/** The types of credential. */
	credentialType?: ECredentialType;

	/**
	 * Generates a new AuthCredentials using the given credentials.
	 *
	 * @param cookie The cookie to be used for authenticating against Twitter.
	 * @param guestToken The guest token to be used to authenticate a guest session.
	 */
	constructor(cookie?: AuthCookie, guestToken?: string) {
		this.authToken =
			'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
		// If guest credentials given
		if (!cookie && guestToken) {
			this.guestToken = guestToken;
			this.credentialType = ECredentialType.GUEST;
		}
		// If login credentials given
		else if (cookie && guestToken) {
			this.cookie = cookie.toString();
			this.guestToken = guestToken;
			this.credentialType = ECredentialType.LOGIN;
		}
		// If user credentials given
		else if (cookie && !guestToken) {
			this.cookie = cookie.toString();
			this.csrfToken = cookie.ct0;
			this.credentialType = ECredentialType.USER;
		}
	}
}
