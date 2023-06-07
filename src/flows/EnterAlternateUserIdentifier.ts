// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';

// FLOWS
import { getAuthHeader } from './PreLogin';
import { AuthCredential } from '../models/AuthCredential';

// TYPES
import { Root as IEnterAlternateUserIndentifierResponse } from '../types/response/EnterAlternateUserIdentifier';

// ENUMS
import { EHttpStatus, EAuthenticationErrors } from '../enums/Errors';

/**
 * Step 4: Takes the username for login
 * @internal
 */
export async function enterAlternateUserIdentifier(userName: string, flowToken: string, cred: AuthCredential): Promise<void> {
    // Executing the subtask
    const res: CurlyResult<IEnterAlternateUserIndentifierResponse> = await curly.post<IEnterAlternateUserIndentifierResponse>('https://api.twitter.com/1.1/onboarding/task.json', {
        httpHeader: getAuthHeader(cred),
        sslVerifyPeer: false,
        /* eslint-disable */
        postFields: JSON.stringify({
            "flow_token": flowToken,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginEnterAlternateIdentifierSubtask",
                    "enter_text": {
                        "text": userName,
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
    await enterPassword();
}