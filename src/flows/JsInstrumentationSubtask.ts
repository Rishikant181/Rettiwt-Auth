// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';
import { Cookie } from 'cookiejar';

// FLOWS
import { getAuthHeader } from './PreLogin';
import { enterUserIdentifier } from './EnterUserIdentifier';

// TYPES
import { Root as IJsInstrumentationResponse } from '../types/response/JsInstrumentationSubtask';

// MODELS
import { AuthCredential } from '../models/AuthCredential';
import { AccountCredential } from '../models/AccountCredential';

/**
 * Step 2: Does something
 * 
 * @param authCred The authentication credentials to use.
 * @param flowToken The flow token required to exectute this flow
 * @param accountCred The credentials of the Twitter account to be logged into.
 */
export async function jsInstrumentationSubtask(authCred: AuthCredential, flowToken: string, accountCred: AccountCredential): Promise<Cookie[]> {
    // Executing the subtask
    const res: CurlyResult<IJsInstrumentationResponse> = await curly.post<IJsInstrumentationResponse>('https://api.twitter.com/1.1/onboarding/task.json', {
        httpHeader: getAuthHeader(authCred),
        sslVerifyPeer: false,
        /* eslint-disable */
        postFields: JSON.stringify({
            "flow_token": flowToken,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginJsInstrumentationSubtask",
                    "js_instrumentation": {
                        "response": "{\"rf\":{\"a09453c7341fb1cbb7d51561f92d478fa0752bc77e7ca6b5703258680b2c51d7\":-4,\"bd26c6694e256b10766447d992deaf92bb220bc05e3b8205ba5c9a4f83302230\":0,\"abfa440376b8dc33ca518e1e2a998b3ac4200a8122ef09781eea2c1408717111\":-1,\"a4e87b66027f638a4634561275fab00f9f7446b81a180b5f03eda69fa32eb8f4\":-224},\"s\":\"yET9nlXrlGRAylCyyBKEsxOpUweMpjRz5RfKzTzQyVADnKE64gmpyILfKBK0-HIHWY8FbJPHGWr6QrCb5A-Z3q2SLRm4DReprZGXykJ111_ynet8kSjFkRjODKKDN2FzT1V6rx9FILnUuRCaMu9ewfPgPBi4wO1g7EUeEsSSHIiCwNc9URJr4c2xVTA3ibIfTbu8p2WhX7RZAk8LWRPpPPB21st8Z1j0LcLlR0bkZoF6LsN-7w75lGB0s4z1JKqus2MVuRcPMay0wWZbn8Qx9In_-tSTvEBLcxjUpDgwu29G0g0iCWoISFzLY4-LLvV7UBGklkByIcPtwYbDbREqRQAAAYYmXAsG\"}",
                        "link": "next_link"
                    }
                }
            ]
        })
        /* eslint-enable */
    });

    // Getting the flow token
    flowToken = res.data.flow_token;

    // Executing next subtask
    return await enterUserIdentifier(authCred, flowToken, accountCred);
}