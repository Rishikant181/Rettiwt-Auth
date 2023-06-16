export interface IUserIdentifierInput {
	setting_responses: ISettingResponse[];
	link: string;
}

export interface ISettingResponse {
	key: string;
	response_data: IResponseData;
}

export interface IResponseData {
	text_data: ITextData;
}

export interface ITextData {
	result: string;
}
