// TYPES
import { IAlternateUserIdentifierInput } from '../../../../types/request/payloads/subtasks/AlternateUserIdentifier';

/**
 * The input data to be sent alternate user identification.
 *
 * @internal
 */
export class AlternateUserIdentifierInput implements IAlternateUserIdentifierInput {
	public text: string;
	public link: string;

	/**
	 * @param userName The username associated with the Twitter account.
	 */
	public constructor(userName: string) {
		this.text = userName;
		this.link = 'next_link';
	}
}
