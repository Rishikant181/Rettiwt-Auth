export interface Root {
    flow_token: string
    status: string
    subtasks: Subtask[]
    errors: Error[]
}

export interface Subtask {
    subtask_id: string
    check_logged_in_account: CheckLoggedInAccount
}

export interface CheckLoggedInAccount {
    true_link: TrueLink
    false_link: FalseLink
    user_id: string
}

export interface TrueLink {
    link_type: string
    link_id: string
}

export interface FalseLink {
    link_type: string
    link_id: string
}

export interface Error {
    code: number
    message: string
}
