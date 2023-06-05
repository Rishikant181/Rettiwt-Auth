// PACKAGES
import axios from 'axios';

// TYPES
import { IAuthCredential } from "../types/AuthCredential";
import { Result as GuestTokenResponse } from '../types/response/GuestToken';

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

    /**
     * Generates a new AuthCredentials using the given cookie.
     * 
     * @param cookie The cookie to be used for authenticating against Twitter.
     */
    async get(cookie: AuthCookie): Promise<AuthCredential> {
        this.authToken = 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
        this.guestToken = await this.getGuestToken();
        this.csrfToken = cookie.ct0;
        this.cookie = cookie.toString();

        return this;
    }

    /**
     * Generates a new guest token using the Twitter API.
     * 
     * @returns The generated guest token string.
     */
    private async getGuestToken(): Promise<string> {
        // Getting the guest credentials from twitter
        return await axios.post<GuestTokenResponse>('https://api.twitter.com/1.1/guest/activate.json', null, {
            headers: {
                /* eslint-disable */
                'Authorization': this.authToken
                /* eslint-enable */
            }
        }).then(res => res.data.guest_token);
    }
}
