// TYPES
import { IAccountDuplicationCheck } from '../../../../types/request/payloads/subtasks/AccountDuplicationCheck';

/**
 * The input data to be sent for checking account duplication.
 *
 * @internal
 */
export class AccountDuplicationCheckInput implements IAccountDuplicationCheck {
	link: string;

	constructor() {
		this.link = 'AccountDuplicationCheck_false';
	}
}
