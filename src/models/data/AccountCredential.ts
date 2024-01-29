/**
 * The credentials of the Twitter account to be logged into.
 */
export class AccountCredential {
	/** The email id associated with the Twitter account. */
	public email: string;

	/** The username associated with the Twitter account. */
	public userName: string;

	/** The password to the Twitter account. */
	public password: string;

	/**
	 * @param cred - The credentials to the Twitter account.
	 */
	public constructor(cred: AccountCredential) {
		this.email = cred.email;
		this.userName = cred.userName;
		this.password = cred.password;
	}
}
