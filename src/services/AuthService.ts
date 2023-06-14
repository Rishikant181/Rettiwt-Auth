// PACKAGES
import axios from 'axios';

// ENUMS
import { ELoginSubtasks } from '../enums/Login';

// TYPES
import { Root as IGuestTokenResponse } from '../types/response/GuestToken';
import { Root as ILoginSubtaskResponse } from '../types/response/LoginSubtask';

// MODELS
import { AuthCredential } from '../models/AuthCredential';
import { AccountCredential } from '../models/AccountCredential';
import { LoginSubtaskPayload } from '../models/request/payloads/LoginSubtask';

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
    private async initiateLogin(): Promise<void> {
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
     * Generates the apporpriate payload for the given login subtask and given data.
     * 
     * @param subtask The name of the subtask.
     * @param flowToken The flow token for the subtask.
     * @param accCred The account credentials to the Twitter account.
     * @returns The requried payload.
     */
    private getSubtaskPayload(subtask: ELoginSubtasks, flowToken: string, accCred: AccountCredential): LoginSubtaskPayload {
        if (subtask == ELoginSubtasks.ENTER_USER_IDENTIFIER) {
            return new LoginSubtaskPayload(subtask, flowToken, accCred.email);
        }
        else if (subtask == ELoginSubtasks.ENTER_ALTERNATE_USER_IDENTIFIER) {
            return new LoginSubtaskPayload(subtask, flowToken, accCred.userName);
        }
        else if (subtask == ELoginSubtasks.ENTER_PASSWORD) {
            return new LoginSubtaskPayload(subtask, flowToken, accCred.password);
        }
        else {
            return new LoginSubtaskPayload(subtask, flowToken);
        }
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

    async getUserCredential(accCred: AccountCredential): Promise<AuthCredential> {
        // Creating a new guest credential
        this.cred = await this.getGuestCredential();

        // Initiating the login process
        await this.initiateLogin();
    }
}
