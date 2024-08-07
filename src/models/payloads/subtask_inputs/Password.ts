/**
 * The input data to be sent for logging in using password.
 */
export class PasswordInput {
	public link: string = 'next_link';
	public password: string;

	/**
	 * @param password - The password to the Twitter account.
	 */
	public constructor(password: string) {
		this.password = password;
	}
}
