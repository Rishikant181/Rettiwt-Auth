// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';
import { Cookie } from 'cookiejar';

// FLOWS
import { getAuthHeader } from './PreLogin';
import { enterPassword } from './EnterPassword';

// TYPES
import { Root as IEnterAlternateUserIndentifierResponse } from '../types/response/EnterAlternateUserIdentifier';

// ENUMS
import { EHttpStatus, EAuthenticationErrors } from '../enums/Errors';

// MODELS
import { AuthCredential } from '../models/AuthCredential';
import { AccountCredential } from '../models/AccountCredential';

/**
 * Step 4: Takes the username for login
 * @internal
 */
export async function enterAlternateUserIdentifier(authCred: AuthCredential, flowToken: string, accountCred: AccountCredential): Promise<Cookie[]> {
    // Executing the subtask
    const res: CurlyResult<IEnterAlternateUserIndentifierResponse> = await curly.post<IEnterAlternateUserIndentifierResponse>('https://api.twitter.com/1.1/onboarding/task.json', {
        httpHeader: getAuthHeader(authCred),
        sslVerifyPeer: false,
        /* eslint-disable */
        postFields: JSON.stringify({
            "flow_token": flowToken,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginEnterAlternateIdentifierSubtask",
                    "enter_text": {
                        "text": accountCred.userName,
                        "link": "next_link"
                    }
                }
            ]
        })
        /* eslint-enable */
    });

    // If invalid username for the given account
    if (res.statusCode == EHttpStatus.BAD_REQUEST && res.data.errors[0].code == 399) {
        throw new Error(EAuthenticationErrors.INVALID_EMAIL);
    }

    // Getting the flow token
    flowToken = res.data.flow_token;

    // Executing next subtask
    return await enterPassword(authCred, flowToken, accountCred);
}