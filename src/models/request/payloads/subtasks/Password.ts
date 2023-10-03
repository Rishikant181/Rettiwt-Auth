// TYPES
import { IPasswordInput } from '../../../../types/request/payloads/subtasks/Password';

/**
 * The input data to be sent for logging in using password.
 *
 * @internal
 */
export class PasswordInput implements IPasswordInput {
	public password: string;
	public link: string;

	/**
	 * @param password The password to the Twitter account.
	 */
	public constructor(password: string) {
		this.password = password;
		this.link = 'next_link';
	}
}
