// TYPES
import { IAccountCredential } from '../types/AccountCredential';

/**
 * The credentials of the Twitter account to be logged into.
 *
 * @public
 */
export class AccountCredential implements IAccountCredential {
	/** The mail to the Twitter account. */
	email: string;

	/** The username associated with the Twitter account. */
	userName: string;

	/** The password to the Twitter account. */
	password: string;

	/**
	 * Initializes a new AccountCredential instance.
	 *
	 * @param cred The credentials to the Twitter account.
	 */
	constructor(cred: AccountCredential) {
		this.email = cred.email;
		this.userName = cred.userName;
		this.password = cred.password;
	}
}
