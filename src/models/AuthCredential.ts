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
 * @public
 */
export class AuthCredential implements IAuthCredential {
	/** @internal */
	public authToken?: string;

	/** @internal */
	public guestToken?: string;

	/** @internal */
	public csrfToken?: string;

	/** @internal */
	public cookies?: string;

	public authenticationType?: EAuthenticationType;

	/**
	 * Generates a new AuthCredentials using the given credentials.
	 *
	 * Depending on which tokens are present, the authentication type is determined as follows:
	 * - authToken, guestToken =\> Guest authentication.
	 * - authToken, csrfToken, cookie =\> User authentication.
	 * - authToken, guestToken, cookie =\> Guest authentication while logging in.
	 *
	 * @param cookies - The list of cookie strings to be used for authenticating against Twitter.
	 * @param guestToken - The guest token to be used to authenticate a guest session.
	 *
	 * @internal
	 */
	public constructor(cookies?: string[], guestToken?: string) {
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
	 * Converts 'this' object to it's equivalent HTTP header representation.
	 *
	 * @returns 'this' object's equivalent HTTP header representation.
	 */
	public toHeader(): AuthHeader {
		return new AuthHeader(this);
	}
}
