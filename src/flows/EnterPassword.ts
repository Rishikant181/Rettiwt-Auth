// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';

// FLOWS
import { getAuthHeader } from './PreLogin';
import { AuthCredential } from '../models/AuthCredential';

// TYPES
import { Root as IEnterPasswordResponse } from '../types/response/EnterPassword';

// ENUMS
import { EHttpStatus, EAuthenticationErrors } from '../enums/Errors';

/**
 * Step 5: Takes the password for login
 * @internal
 * 
 * @throws {@link AuthenticationErrors.InvalidPassword}, incorrect password entered.
 */
export async function enterPassword(password: string, flowToken: string, cred: AuthCredential): Promise<void> {
    // Executing the subtask
    const res: CurlyResult<IEnterPasswordResponse> = await curly.post<IEnterPasswordResponse>('https://api.twitter.com/1.1/onboarding/task.json', {
        httpHeader: getAuthHeader(cred),
        sslVerifyPeer: false,
        /* eslint-disable */
        postFields: JSON.stringify({
            "flow_token": flowToken,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginEnterPassword",
                    "enter_password": {
                        "password": password,
                        "link": "next_link"
                    }
                }
            ]
        })
        /* eslint-enable */
    });

    // If invalid password for the given account
    if (res.statusCode == EHttpStatus.BAD_REQUEST && res.data.errors[0].code == 399) {
        throw new Error(EAuthenticationErrors.INVALID_PASSWORD);
    }

    // Getting the flow token
    flowToken = res.data.flow_token;

    // Executing next subtask
    await accountDuplicationCheck();
}