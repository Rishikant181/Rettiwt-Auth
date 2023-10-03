// TYPES
import { IJsInstrumentationInput } from './subtasks/JsInstrumentation';
import { IUserIdentifierInput } from './subtasks/UserIdentifier';
import { IAlternateUserIdentifierInput } from './subtasks/AlternateUserIdentifier';
import { IPasswordInput } from './subtasks/Password';
import { IAccountDuplicationCheck } from './subtasks/AccountDuplicationCheck';

export interface ILoginSubtaskPayload {
	/* eslint-disable @typescript-eslint/naming-convention */
	flow_token: string;
	subtask_inputs: ILoginSubtaskInput[];
	/* eslint-enable @typescript-eslint/naming-convention */
}

export interface ILoginSubtaskInput {
	/* eslint-disable @typescript-eslint/naming-convention */
	subtask_id: string;
	js_instrumentation?: IJsInstrumentationInput;
	settings_list?: IUserIdentifierInput;
	enter_text?: IAlternateUserIdentifierInput;
	enter_password?: IPasswordInput;
	check_logged_in_account?: IAccountDuplicationCheck;
	/* eslint-enable @typescript-eslint/naming-convention */
}
