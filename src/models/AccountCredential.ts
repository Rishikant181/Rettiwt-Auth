// TYPES
import { IAccountCredential } from '../types/AccountCredential';

/**
 * The credentials of the Twitter account to be logged into.
 *
 * @public
 */
export class AccountCredential implements IAccountCredential {
	public email: string;
	public userName: string;
	public password: string;

	/**
	 * Initializes a new AccountCredential instance.
	 *
	 * @param cred - The credentials to the Twitter account.
	 *
	 * @internal
	 */
	public constructor(cred: AccountCredential) {
		this.email = cred.email;
		this.userName = cred.userName;
		this.password = cred.password;
	}
}
