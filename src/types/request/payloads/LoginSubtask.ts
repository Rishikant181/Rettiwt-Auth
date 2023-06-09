// TYPES
import { IJsInstrumentationInput } from './subtasks/JsInstrumentation';
import { IUserIdentifierInput } from './subtasks/UserIdentifier';
import { IAlternateUserIdentifierInput } from './subtasks/AlternateUserIdentifier';
import { IPasswordInput } from './subtasks/Password';
import { IAccountDuplicationCheck } from './subtasks/AccountDuplicationCheck';

export interface ILoginSubtaskPayload {
	flow_token: string;
	subtask_inputs: ILoginSubtaskInput[];
}

export interface ILoginSubtaskInput {
	subtask_id: string;
	js_instrumentation?: IJsInstrumentationInput;
	settings_list?: IUserIdentifierInput;
	enter_text?: IAlternateUserIdentifierInput;
	enter_password?: IPasswordInput;
	check_logged_in_account?: IAccountDuplicationCheck;
}
