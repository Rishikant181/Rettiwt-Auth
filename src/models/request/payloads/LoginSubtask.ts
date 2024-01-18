// ENUMS
import { ELoginSubtasks } from '../../../enums/Login';

// MODELS
import { JsInstrumentationInput } from './subtasks/JsInstrumentation';
import { UserIdentifierInput } from './subtasks/UserIdentifier';
import { AlternateUserIdentifierInput } from './subtasks/AlternateUserIdentifier';
import { PasswordInput } from './subtasks/Password';
import { AccountDuplicationCheckInput } from './subtasks/AccountDuplicationCheck';

/**
 * The payload to be sent for each login subtask.
 *
 * @internal
 */
export class LoginSubtaskPayload {
	/* eslint-disable @typescript-eslint/naming-convention */
	public flow_token: string;
	public subtask_inputs: LoginSubtaskInput[];
	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * @param subtaskId - The id of the subtask to be executed.
	 * @param flowToken - The flow token for the subtask to be executed.
	 * @param inputText - The input string data to be sent in payload.
	 */
	public constructor(subtaskId: ELoginSubtasks, flowToken: string, inputText?: string) {
		this.flow_token = flowToken;
		this.subtask_inputs = [new LoginSubtaskInput(subtaskId, inputText)];
	}
}

/**
 * The subtask input according to the type of subtask to be executed.
 *
 * @internal
 */
class LoginSubtaskInput {
	/* eslint-disable @typescript-eslint/naming-convention */
	public subtask_id: string;
	public js_instrumentation?: JsInstrumentationInput;
	public settings_list?: UserIdentifierInput;
	public enter_text?: AlternateUserIdentifierInput;
	public enter_password?: PasswordInput;
	public check_logged_in_account?: AccountDuplicationCheckInput;
	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * @param subtaskId - The id of the subtask to be executed.
	 * @param inputText - The input string data to be sent.
	 */
	public constructor(subtaskId: ELoginSubtasks, inputText?: string) {
		this.subtask_id = subtaskId;

		// Initializing appropriate subtask input according to subtaskId
		if (subtaskId == ELoginSubtasks.JS_INSTRUMENTATION) {
			this.js_instrumentation = new JsInstrumentationInput();
		} else if (subtaskId == ELoginSubtasks.ENTER_USER_IDENTIFIER && inputText) {
			this.settings_list = new UserIdentifierInput(inputText);
		} else if (subtaskId == ELoginSubtasks.ENTER_ALTERNATE_USER_IDENTIFIER && inputText) {
			this.enter_text = new AlternateUserIdentifierInput(inputText);
		} else if (subtaskId == ELoginSubtasks.ENTER_PASSWORD && inputText) {
			this.enter_password = new PasswordInput(inputText);
		} else if (subtaskId == ELoginSubtasks.ACCOUNT_DUPLICATION_CHECK) {
			this.check_logged_in_account = new AccountDuplicationCheckInput();
		}
	}
}
