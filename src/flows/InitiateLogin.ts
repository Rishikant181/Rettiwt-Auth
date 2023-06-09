// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';
import { Cookie, CookieJar } from 'cookiejar';

// FLOWS
import { getGuestToken, getAuthHeader } from './PreLogin';
import { AuthCredential } from '../models/AuthCredential';
import { jsInstrumentationSubtask } from './JsInstrumentationSubtask';

// TYPES
import { Root as IInitiateLoginResponse } from '../types/response/InitiateLogin';

// MODELS
import { AuthCookie } from '../models/AuthCookie';
import { AccountCredential } from '../models/AccountCredential';

/**
 * Step 1: Initiates login
 * 
 * @param accountCred The credentials of the Twitter account to be logged into.
 */
export async function initiateLogin(accountCred: AccountCredential): Promise<void> {
    // Getting a new guest credential
    let authCred: AuthCredential = new AuthCredential(undefined, await getGuestToken())

    // Initiating the login process
    const res: CurlyResult<IInitiateLoginResponse> = await curly.post<IInitiateLoginResponse>('https://api.twitter.com/1.1/onboarding/task.json?flow_name=login', {
        httpHeader: getAuthHeader(authCred),
        sslVerifyPeer: false,
        postFields: ''
    });

    // Storing cookies received
    const cookies: Cookie[] = new CookieJar().setCookies(res.headers[0]['Set-Cookie'] as string[]);

    // Getting the flow token
    const flowToken = res.data.flow_token;

    // Adding the cookie to the credential
    authCred = new AuthCredential(new AuthCookie(cookies.join(';').toString()), authCred.guestToken);

    // Executing next subtask
    await jsInstrumentationSubtask(authCred, flowToken, accountCred);
}