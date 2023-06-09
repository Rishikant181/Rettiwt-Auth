// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';
import { Cookie } from 'cookiejar';

// FLOWS
import { getAuthHeader } from './PreLogin';
import { AuthCredential } from '../models/AuthCredential';
import { enterAlternateUserIdentifier } from './EnterAlternateUserIdentifier';
import { enterPassword } from './EnterPassword';

// TYPES
import { Root as IEnterUserIndentifierResponse } from '../types/response/EnterUserIndentifier';

// ENUMS
import { EHttpStatus, EAuthenticationErrors } from '../enums/Errors';

// MODELS
import { AccountCredential } from '../models/AccountCredential';

/**
 * Step 3: Takes the email for login
 * 
 * @param authCred The authentication credentials to use.
 * @param flowToken The flow token required to exectute this flow
 * @param accountCred The credentials of the Twitter account to be logged into.
 */
export async function enterUserIdentifier(authCred: AuthCredential, flowToken: string, accountCred: AccountCredential): Promise<Cookie[]> {
    // Executing the subtask
    const res: CurlyResult<IEnterUserIndentifierResponse> = await curly.post<IEnterUserIndentifierResponse>('https://api.twitter.com/1.1/onboarding/task.json', {
        httpHeader: getAuthHeader(authCred),
        sslVerifyPeer: false,
        /* eslint-disable */
        postFields: JSON.stringify({
            "flow_token": flowToken,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginEnterUserIdentifierSSO",
                    "settings_list": {
                        "setting_responses": [
                            {
                                "key": "user_identifier",
                                "response_data": {
                                    "text_data": {
                                        "result": accountCred.email
                                    }
                                }
                            }
                        ],
                        "link": "next_link"
                    }
                }
            ]
        })
        /* eslint-enable */
    });

    // If no account found with given email
    if (res.statusCode == EHttpStatus.BAD_REQUEST && res.data.errors[0].code == 399) {
        throw new Error(EAuthenticationErrors.INVALID_EMAIL);
    }

    // Getting the flow token
    flowToken = res.data.flow_token;

    // Checking the next available subtasks
    /**
     * This subtask has two possible outcomes.  
     * 1. The server asks for a username next.
     * 2. The server directly asks for password, skipping username check.
     * 
     * So, checking which is the subtask required by server, and executing that particular subtask.
     */
    // If next subtask is to enter username
    if (res.data.subtasks.map(task => task.subtask_id).includes('LoginEnterAlternateIdentifierSubtask')) {
        // Executing next subtask
        return await enterAlternateUserIdentifier(authCred, flowToken, accountCred);
    }
    // If next subtask is to enter password
    else {
        // Executing next subtask
        return await enterPassword(authCred, flowToken, accountCred);
    }
}