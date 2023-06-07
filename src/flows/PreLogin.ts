// PACKAGES
import axios from 'axios';

// TYPES
import { Result as GuestTokenResponse } from '../types/response/GuestToken';

// MODELS
import { AuthCredential } from '../models/AuthCredential';

/**
 * Generates a new guest token using the Twitter API.
 *
 * @returns The guest token string.
 */
export async function getGuestToken(): Promise<string> {
    // Getting the guest credentials from twitter
    return await axios
        .post<GuestTokenResponse>('https://api.twitter.com/1.1/guest/activate.json', null, {
            headers: {
                /* eslint-disable */
                Authorization: cred.authToken,
                /* eslint-enable */
            },
        })
        .then((res) => res.data.guest_token);
}

/**
 * Generates the appropriate headers for authentiation.
 * 
 * @param cred The {@link AuthCredential} to be used for authentication.
 * @returns The headers as an array of string.
 */
export function getAuthHeader(cred: AuthCredential): string[] {
    return [
        `sec-ch-ua: "Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"`,
        `x-twitter-client-language: en`,
        cred.csrfToken ? `x-csrf-token: ${cred.csrfToken}` : '',
        `sec-ch-ua-mobile: ?0`,
        cred.authToken ? `authorization: ${cred.authToken}` : '',
        `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78`,
        `content-type: application/json`,
        cred.guestToken ? `x-guest-token: ${cred.guestToken}` : '',
        `x-twitter-active-user: yes`,
        `sec-ch-ua-platform: "Windows"`,
        `Accept: */*`,
        `host: api.twitter.com`,
        cred.cookie ? `Cookie: ${cred.cookie}` : ''
    ];
}