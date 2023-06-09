// TYPES
import { IJsInstrumentationInput } from './JsInstrumentation';
import { IUserIdentifierInput } from './UserIdentifier';
import { IAlternateUserIdentifierInput } from './AlternateUserIdentifier';
import { IPasswordInput } from './Password';
import { ICheckLoggedInInput } from './CheckLoggedIn';

export interface ILoginSubtaskPayload {
    flow_token: string
    subtask_inputs: ILoginSubtaskInput[]
}

export interface ILoginSubtaskInput {
    subtask_id: string
    js_instrumentation?: IJsInstrumentationInput
    settings_list?: IUserIdentifierInput
    enter_text?: IAlternateUserIdentifierInput
    enter_password?: IPasswordInput
    check_logged_in_account?: ICheckLoggedInInput
}