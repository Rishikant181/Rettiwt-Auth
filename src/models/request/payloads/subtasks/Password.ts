// TYPES
import { IPasswordInput } from '../../../../types/request/payloads/subtasks/Password';

/**
 * The input data to be sent for logging in using password.
 *
 * @internal
 */
export class PasswordInput implements IPasswordInput {
	password: string;
	link: string;

	/**
	 * @param password The password to the Twitter account.
	 */
	constructor(password: string) {
		this.password = password;
		this.link = 'next_link';
	}
}
