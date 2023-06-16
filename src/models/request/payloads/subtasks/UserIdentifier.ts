// TYPES
import {
	IResponseData,
	ISettingResponse,
	ITextData,
	IUserIdentifierInput,
} from '../../../../types/request/payloads/subtasks/UserIdentifier';

/**
 * The input data to be sent for identifying the user using email, phone, etc.
 *
 * @internal
 */
export class UserIdentifierInput implements IUserIdentifierInput {
	/* eslint-disable */
	setting_responses: ISettingResponse[];
	link: string;
	/* eslint-enable */

	/**
	 * @param userId The id to be used for identifying the user.
	 */
	constructor(userId: string) {
		this.setting_responses = [new SettingResponse(userId)];
		this.link = 'next_link';
	}
}

/**
 * The response received from the user for identification purpose.
 */
class SettingResponse implements ISettingResponse {
	/* eslint-disable */
	key: string;
	response_data: IResponseData;
	/* eslint-enable */

	/**
	 * @param responseText The text entered by the user.
	 */
	constructor(responseText: string) {
		this.key = 'user_identifier';
		this.response_data = new ResponseData(responseText);
	}
}

/**
 * The raw response data in case of identification using email.
 */
class ResponseData implements IResponseData {
	/* eslint-disable */
	text_data: ITextData;
	/* eslint-enable */

	/**
	 * @param email The email id of the user.
	 */
	constructor(email: string) {
		this.text_data = new TextData(email);
	}
}

/**
 * The raw, elemental text data.
 */
class TextData implements ITextData {
	result: string;

	/**
	 * @param text The text data entered.
	 */
	constructor(text: string) {
		this.result = text;
	}
}
