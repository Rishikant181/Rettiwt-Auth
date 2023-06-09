export interface ILoginSubtaskPayload {
    flow_token: string
    subtask_inputs: SubtaskInput[]
}

export interface SubtaskInput {
    subtask_id: string
    js_instrumentation?: JsInstrumentation
    settings_list?: SettingsList
    enter_text?: EnterText
    enter_password?: EnterPassword
    check_logged_in_account?: CheckLoggedInAccount
}

export interface JsInstrumentation {
    response: string
    link: string
}

export interface SettingsList {
    setting_responses: SettingResponse[]
    link: string
}

export interface SettingResponse {
    key: string
    response_data: ResponseData
}

export interface ResponseData {
    text_data: TextData
}

export interface TextData {
    result: string
}

export interface EnterText {
    text: string
    link: string
}

export interface EnterPassword {
    password: string
    link: string
}

export interface CheckLoggedInAccount {
    link: string
}
