// PACKAGES
import axios from 'axios';

// TYPES
import { Root as IGuestTokenResponse } from '../types/response/GuestToken';

// MODELS
import { AuthCredential } from '../models/AuthCredential';

/**
 * A class that deals with authenticating against Twitter API.
 */
export class AuthService {
    /**
     * Fetches a guest token, for guest authentication, from Twitter API.
     * 
     * @returns The credentials containing the guest token.
     */
    async getGuestCredential(): Promise<AuthCredential> {
        // Creating a new blank credential
        const cred: AuthCredential = new AuthCredential();

        // Getting the guest token
        await axios
            .post<IGuestTokenResponse>('https://api.twitter.com/1.1/guest/activate.json', null, {
                headers: {
                    /* eslint-disable */
                    Authorization: `Bearer ${cred.authToken as string}`,
                    /* eslint-enable */
                },
            })
            .then((res) => {
                cred.guestToken = res.data.guest_token;
            });

        return cred;
    }
}
