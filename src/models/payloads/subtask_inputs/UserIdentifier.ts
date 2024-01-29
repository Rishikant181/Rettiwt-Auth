/**
 * The input data to be sent for identifying the user using email, phone, etc.
 */
export class UserIdentifierInput {
	/* eslint-disable @typescript-eslint/naming-convention */
	public setting_responses: SettingResponse[];
	public link: string = 'next_link';
	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * @param userId - The id to be used for identifying the user.
	 */
	public constructor(userId: string) {
		this.setting_responses = [new SettingResponse(userId)];
	}
}

/**
 * The response received from the user for identification purpose.
 */
class SettingResponse {
	/* eslint-disable @typescript-eslint/naming-convention */
	public key: string = 'user_identifier';
	public response_data: ResponseData;
	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * @param responseText - The text entered by the user.
	 */
	public constructor(responseText: string) {
		this.response_data = new ResponseData(responseText);
	}
}

/**
 * The raw response data in case of identification using email.
 */
class ResponseData {
	/* eslint-disable */
	text_data: TextData;
	/* eslint-enable */

	/**
	 * @param email - The email id of the user.
	 */
	public constructor(email: string) {
		this.text_data = new TextData(email);
	}
}

/**
 * The raw, elemental text data.
 */
class TextData {
	public result: string;

	/**
	 * @param text - The text data entered.
	 */
	public constructor(text: string) {
		this.result = text;
	}
}
