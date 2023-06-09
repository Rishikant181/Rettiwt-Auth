// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';

// FLOWS
import { getAuthHeader } from './PreLogin';
import { accountDuplicationCheck } from './AccountDuplicationCheck';

// TYPES
import { Root as IEnterPasswordResponse } from '../types/response/EnterPassword';

// MODELS
import { AuthCredential } from '../models/AuthCredential';
import { AccountCredential } from '../models/AccountCredential';

// ENUMS
import { EHttpStatus, EAuthenticationErrors } from '../enums/Errors';

/**
 * Step 5: Takes the password for login
 * 
 * @param authCred The authentication credentials to use.
 * @param flowToken The flow token required to exectute this flow
 * @param accountCred The credentials of the Twitter account to be logged into.
 */
export async function enterPassword(authCred: AuthCredential, flowToken: string, accountCred: AccountCredential): Promise<void> {
    // Executing the subtask
    const res: CurlyResult<IEnterPasswordResponse> = await curly.post<IEnterPasswordResponse>('https://api.twitter.com/1.1/onboarding/task.json', {
        httpHeader: getAuthHeader(authCred),
        sslVerifyPeer: false,
        /* eslint-disable */
        postFields: JSON.stringify({
            "flow_token": flowToken,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginEnterPassword",
                    "enter_password": {
                        "password": accountCred.password,
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
    await accountDuplicationCheck(authCred, flowToken);
}