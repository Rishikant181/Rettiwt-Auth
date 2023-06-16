/**
 * The credentials of the Twitter account to be logged into.
 *
 * @public
 */
export interface IAccountCredential {
	/** The mail to the Twitter account. */
	email: string;

	/** The username associated with the Twitter account. */
	userName: string;

	/** The password to the Twitter account. */
	password: string;
}
