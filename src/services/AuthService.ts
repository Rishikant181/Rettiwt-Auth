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
import { AuthCookie } from '../models/AuthCookie';

/**
 * A class that deals with authenticating against Twitter API.
 */
export class AuthService {
    /** The current flow token. */
    private flowToken: string;

    /** The current auth credentials. */
    private cred: AuthCredential;

    /** The current cookies */
    private cookies: string[];

    /** The order in which the login subtasks must be executed. */
    private subtasks: ELoginSubtasks[];

    constructor() {
        this.flowToken = '';
        this.cred = new AuthCredential();
        this.cookies = [];
        this.subtasks = [
            ELoginSubtasks.JS_INSTRUMENTATION,
            ELoginSubtasks.ENTER_USER_IDENTIFIER,
            ELoginSubtasks.ENTER_ALTERNATE_USER_IDENTIFIER,
            ELoginSubtasks.ENTER_PASSWORD,
            ELoginSubtasks.ACCOUNT_DUPLICATION_CHECK
        ]
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

    /**
     * Fetches the credentials for uses authentication, from Twitter API.
     * 
     * @param accCred The credentials (email, username and password) to the Twitter account.
     * @returns The credentials containing the authenticated tokens.
     */
    async getUserCredential(accCred: AccountCredential): Promise<AuthCredential> {
        // Creating a new guest credential
        this.cred = await this.getGuestCredential();

        // Initiating the login process
        await this.initiateLogin();

        // Executing the subtasks in the pre-defined order
        for (let i: number = 0; i < this.subtasks.length; i++) {
            // Preparing the subtask payload
            const payload: LoginSubtaskPayload = this.getSubtaskPayload(this.subtasks[i], this.flowToken, accCred);

            // Executing the subtask
            await axios.post<ILoginSubtaskResponse>('https://api.twitter.com/1.1/onboarding/task.json', payload, {
                headers: {
                    /* eslint-disable */
                    'Authorization': `Bearer ${this.cred.authToken as string}`,
                    'x-guest-token': this.cred.guestToken,
                    'Cookie': this.cookies.join(';')
                    /* eslint-enable */
                }
            }).then(res => {
                /**
                 * After the execution of ENTER_USER_IDENTIFIER subtask, two outcomes are possible:
                 * 
                 * 1. Twitter API asks username, then asks for password
                 * 2. Twitter API directly asks for password, skipping username check
                 * 
                 * Therefore, it is checked if Twitter API is asking for password after ENTER_USER_IDENTIFIER subtask.
                 * 
                 * If yes, then the next subtask (ENTER_ALTERNATE_USER_IDENTIFIER) is skipped and ENTER_PASSWORD subtask is run directly.
                 */
                if (this.subtasks[i] == ELoginSubtasks.ENTER_USER_IDENTIFIER && res.data.subtasks.map(subtask => subtask.subtask_id).includes(ELoginSubtasks.ENTER_PASSWORD)) {
                    i++;
                }

                // Getting the flow token required for next subtask
                this.flowToken = res.data.flow_token;

                // If this is the last subtask, namely ACCOUNT_DUPLICATION_CHECK, setting the AuthCredentials
                if (this.subtasks[i] == ELoginSubtasks.ACCOUNT_DUPLICATION_CHECK) {
                    this.cred = new AuthCredential(new AuthCookie(res.headers['set-cookie'] as string[]));
                }
            })
        }

        return this.cred;
    }
}
