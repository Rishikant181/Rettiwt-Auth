// PACKAGES
import axios from 'axios';

// TYPES
import { Root as IGuestTokenResponse } from '../types/response/GuestToken';
import { Root as ILoginSubtaskResponse } from '../types/response/LoginSubtask';

// MODELS
import { AuthCredential } from '../models/AuthCredential';
import { ELoginSubtasks } from '../enums/Login';

/**
 * A class that deals with authenticating against Twitter API.
 */
export class AuthService {
    /** The current flow to be executed. */
    flowName: string;

    /** The current flow token. */
    flowToken: string;

    /** The current auth credentials. */
    cred: AuthCredential;

    /** The current cookies */
    cookies: string[];

    constructor() {
        this.flowName = ELoginSubtasks.JS_INSTRUMENTATION;
        this.flowToken = '';
        this.cred = new AuthCredential();
        this.cookies = [];
    }

    /**
     * Initiates the login process and gets the required flow token and cookies for the login process.
     */
    async initiateLogin(): Promise<void> {
        await axios.post<ILoginSubtaskResponse>('https://api.twitter.com/1.1/onboarding/task.json?flow_name=login', null, {
            headers: {
                /* eslint-disable */
                'Authorization': `Bearer ${this.cred.authToken as string}`,
                'x-guest-token': this.cred.guestToken
                /* eslint-enable */
            }
        }).then(res => {
            this.flowToken = res.data.flow_token;
            this.cookies = res.headers['set-cookie'] as string[];
        })
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
}
