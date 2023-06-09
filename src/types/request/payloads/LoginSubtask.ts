export interface ILoginSubtaskPayload {
    flow_token: string
    subtask_inputs: ILoginSubtaskInput[]
}

export interface ILoginSubtaskInput {
    subtask_id: string
    js_instrumentation?: IJsInstrumentationInput
    settings_list?: IUserIdentifierInput
    enter_text?: IAlternateUserIdentifierInput
    enter_password?: IPasswordInput
    check_logged_in_account?: ICheckLoggedInInput
}

export interface IJsInstrumentationInput {
    response: string
    link: string
}

export interface IUserIdentifierInput {
    setting_responses: ISettingResponse[]
    link: string
}

export interface ISettingResponse {
    key: string
    response_data: IResponseData
}

export interface IResponseData {
    text_data: ITextData
}

export interface ITextData {
    result: string
}

export interface IAlternateUserIdentifierInput {
    text: string
    link: string
}

export interface IPasswordInput {
    password: string
    link: string
}

export interface ICheckLoggedInInput {
    link: string
}
