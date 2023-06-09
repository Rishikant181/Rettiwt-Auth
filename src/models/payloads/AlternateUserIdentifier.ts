// TYPES
import { IAlternateUserIdentifierInput } from "../../types/request/payloads/AlternateUserIdentifier";

/**
 * The input data to be sent alternate user identification.
 */
export class AlternateUserIdentifierInput implements IAlternateUserIdentifierInput {
    text: string
    link: string

    /**
     * @param userName The username associated with the Twitter account.
     */
    constructor(userName: string) {
        this.text = userName;
        this.link = 'next_link';
    }
}