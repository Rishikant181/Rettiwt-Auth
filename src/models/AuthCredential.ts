// TYPES
import { IAuthCredential } from "../types/AuthCredential";

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

    async get(cookie: AuthCookie): Promise<AuthCredential> {
        this.authToken = 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
        this.guestToken = '';
        this.csrfToken = cookie.ct0;
        this.cookie = cookie.toString();

        return Promise.resolve(this);
    }
}
