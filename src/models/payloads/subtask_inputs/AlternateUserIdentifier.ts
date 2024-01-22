/**
 * The input data to be sent alternate user identification.
 */
export class AlternateUserIdentifierInput {
	public text: string;
	public link: string = 'next_link';

	/**
	 * @param userName - The username associated with the Twitter account.
	 */
	public constructor(userName: string) {
		this.text = userName;
	}
}
