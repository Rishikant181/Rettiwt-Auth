/**
 * The input data to be sent for logging in using password.
 */
export class PasswordInput {
	public password: string;
	public link: string = 'next_link';

	/**
	 * @param password - The password to the Twitter account.
	 */
	public constructor(password: string) {
		this.password = password;
	}
}
