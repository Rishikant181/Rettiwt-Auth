export interface IUserIdentifierInput {
	/* eslint-disable @typescript-eslint/naming-convention */
	setting_responses: ISettingResponse[];
	link: string;
	/* eslint-enable @typescript-eslint/naming-convention */
}

export interface ISettingResponse {
	/* eslint-disable @typescript-eslint/naming-convention */
	key: string;
	response_data: IResponseData;
	/* eslint-enable @typescript-eslint/naming-convention */
}

export interface IResponseData {
	/* eslint-disable @typescript-eslint/naming-convention */
	text_data: ITextData;
	/* eslint-enable @typescript-eslint/naming-convention */
}

export interface ITextData {
	result: string;
}
