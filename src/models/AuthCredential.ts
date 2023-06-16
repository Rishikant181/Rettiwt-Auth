// ENUMS
import { EAuthenticationType } from '../enums/Authentication';

// TYPES
import { IAuthCredential } from '../types/AuthCredential';

// MODELS
import { AuthCookie } from './AuthCookie';
import { AuthHeader } from './AuthHeader';

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

	/** The csrf token for the session. */
	csrfToken?: string;

	/** The cookie of the twitter account, which is used to authenticate against twitter. */
	cookies?: string;

	/** The types of credential. */
	authenticationType?: EAuthenticationType;

	/**
	 * Generates a new AuthCredentials using the given credentials.
	 *
	 * @param cookies The list of cookie strings to be used for authenticating against Twitter.
	 * @param guestToken The guest token to be used to authenticate a guest session.
	 */
	constructor(cookies?: string[], guestToken?: string) {
		this.authToken =
			'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
		// If guest credentials given
		if (!cookies && guestToken) {
			this.guestToken = guestToken;
			this.authenticationType = EAuthenticationType.GUEST;
		}
		// If login credentials given
		else if (cookies && guestToken) {
			// Parsing the cookies
			const parsedCookie: AuthCookie = new AuthCookie(cookies);

			this.cookies = parsedCookie.toString();
			this.guestToken = guestToken;
			this.authenticationType = EAuthenticationType.LOGIN;
		}
		// If user credentials given
		else if (cookies && !guestToken) {
			// Parsing the cookies
			const parsedCookie: AuthCookie = new AuthCookie(cookies);

			this.cookies = parsedCookie.toString();
			this.csrfToken = parsedCookie.ct0;
			this.authenticationType = EAuthenticationType.USER;
		}
	}

	/**
	 * @returns 'this' object's equivalent HTTP header representation.
	 */
	toHeader(): AuthHeader {
		return new AuthHeader(this);
	}
}
