// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';
import { Cookie, CookieJar } from 'cookiejar';

// FLOWS
import { getGuestToken, getAuthHeader } from './PreLogin';
import { AuthCredential } from '../models/AuthCredential';

// TYPES
import { Root as IInitiateLoginResponse } from '../types/response/InitiateLogin';
import { AuthCookie } from '../models/AuthCookie';

/**
 * Step 1: Initiates login
 * @internal
 */
export async function initiateLogin(): Promise<void> {
    // Getting a new guest credential
    let cred: AuthCredential = new AuthCredential(undefined, await getGuestToken())

    // Initiating the login process
    const res: CurlyResult<IInitiateLoginResponse> = await curly.post<IInitiateLoginResponse>('https://api.twitter.com/1.1/onboarding/task.json?flow_name=login', {
        httpHeader: getAuthHeader(cred),
        sslVerifyPeer: false,
        postFields: ''
    });

    // Storing cookies received
    const cookies: Cookie[] = new CookieJar().setCookies(res.headers[0]['Set-Cookie'] as string[]);

    // Getting the flow token
    const flowToken = res.data.flow_token;

    // Adding the cookie to the credential
    cred = new AuthCredential(new AuthCookie(cookies.join(';').toString()), cred.guestToken);

    // Executing next subtask
    await this.jsInstrumentationSubtask();
}