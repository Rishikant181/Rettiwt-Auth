// PACKAGES
import axios from 'axios';

// TYPES
import { Root as IGuestTokenResponse } from '../types/response/GuestToken';
import { Root as ILoginSubtaskResponse } from '../types/response/LoginSubtask';

// MODELS
import { AuthCredential } from '../models/AuthCredential';
import { AccountCredential } from '../models/AccountCredential';

/**
 * A class that deals with authenticating against Twitter API.
 */
export class AuthService {
    /**
     * Fetches the initial flow token that is required for executing successive login subtasks.
     * 
     * @param guestCred The guest credential to use.
     * @returns The required flow token.
     */
    private async getInitialFlowToken(guestCred: AuthCredential): Promise<string> {
        // Getting the initial flow token
        return await axios.post<ILoginSubtaskResponse>('https://api.twitter.com/1.1/onboarding/task.json?flow_name=login', null, {
            headers: {
                /* eslint-disable */
                'Authorization': `Bearer ${guestCred.authToken as string}`,
                'x-guest-token': guestCred.guestToken
                /* eslint-enable */
            },
        }).then(res => res.data.flow_token);
    }

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

    async getUserCredential(userCred: AccountCredential): Promise<AuthCredential> {
        /* The current flow token */
        let flowToken: string;

        // Creating a new guest credential
        const cred: AuthCredential = await this.getGuestCredential();


    }
}
