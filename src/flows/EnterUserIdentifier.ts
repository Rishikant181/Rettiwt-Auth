// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';

// FLOWS
import { getAuthHeader } from './PreLogin';
import { AuthCredential } from '../models/AuthCredential';

// TYPES
import { Root as IEnterUserIndentifierResponse } from '../types/response/EnterUserIndentifier';

// ENUMS
import { EHttpStatus, EAuthenticationErrors } from '../enums/Errors';

/**
 * Step 3: Takes the email for login
 * @internal
 */
export async function enterUserIdentifier(email: string, cred: AuthCredential, flowToken: string): Promise<void> {
    // Executing the subtask
    const res: CurlyResult<IEnterUserIndentifierResponse> = await curly.post<IEnterUserIndentifierResponse>('https://api.twitter.com/1.1/onboarding/task.json', {
        httpHeader: getAuthHeader(cred),
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
                                        "result": email
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
    for (const task of res.data.subtasks) {
        // If next subtask is to enter username
        if (task.subtask_id == 'LoginEnterAlternateIdentifierSubtask') {
            // Executing next subtask
            await enterAlternateUserIdentifier();
            break;
        }
        // If next subtask is to enter password
        else if (task.subtask_id == 'LoginEnterPassword') {
            // Executing next subtask
            await enterPassword();
            break;
        }
    }
}