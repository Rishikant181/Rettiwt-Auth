/**
 * The input data to be sent alternate user identification.
 */
export class AlternateUserIdentifierInput {
	public link: string = 'next_link';
	public text: string;

	/**
	 * @param userName - The username associated with the Twitter account.
	 */
	public constructor(userName: string) {
		this.text = userName;
	}
}
