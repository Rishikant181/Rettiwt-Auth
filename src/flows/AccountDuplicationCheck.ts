// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';
import { Cookie, CookieJar } from 'cookiejar';

// FLOWS
import { getAuthHeader } from './PreLogin';
import { AuthCredential } from '../models/AuthCredential';

// TYPES
import { Root as IAccountDuplicationCheckResponse } from '../types/response/AccountDuplicationCheck';

/**
 * Step 6: Gets the actual cookies
 * @internal
 */
export async function accountDuplicationCheck(flowToken: string, cred: AuthCredential): Promise<Cookie[]> {
    // Executing the subtask
    const res: CurlyResult<IAccountDuplicationCheckResponse> = await curly.post<IAccountDuplicationCheckResponse>('https://api.twitter.com/1.1/onboarding/task.json', {
        httpHeader: getAuthHeader(cred),
        sslVerifyPeer: false,
        /* eslint-disable */
        postFields: JSON.stringify({
            "flow_token": flowToken,
            "subtask_inputs": [
                {
                    "subtask_id": "AccountDuplicationCheck",
                    "check_logged_in_account": {
                        "link": "AccountDuplicationCheck_false"
                    }
                }
            ]
        })
        /* eslint-enable */
    });

    // Getting the cookies from the set-cookie header of the reponse.
    const cookies: Cookie[] = new CookieJar().setCookies(res.headers[0]['Set-Cookie'] as string[]);

    return cookies;
}