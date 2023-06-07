export interface Root {
    flow_token: string
    status: string
    subtasks: Subtask[]
    errors: Error[]
}

export interface Subtask {
    subtask_id: string
    enter_password?: EnterPassword
    subtask_back_navigation?: string
    open_link?: OpenLink
}

export interface EnterPassword {
    primary_text: PrimaryText
    next_link: NextLink
    hint: string
    email: string
    user_identifier_display_type: string
    skip_password_validation: boolean
    os_content_type: string
    footer: Footer
    password_field: PasswordField
}

export interface PrimaryText {
    text: string
    entities: any[]
}

export interface NextLink {
    link_type: string
    link_id: string
    label: string
}

export interface Footer {
    style: string
    footnote_text: FootnoteText
}

export interface FootnoteText {
    text: string
    entities: Entity[]
}

export interface Entity {
    from_index: number
    to_index: number
    navigation_link: NavigationLink
}

export interface NavigationLink {
    link_type: string
    link_id: string
    url: string
}

export interface PasswordField {
    content_type: string
    hint_text: string
    detail_text: DetailText
}

export interface DetailText {
    text: string
    entities: Entity2[]
}

export interface Entity2 {
    from_index: number
    to_index: number
    navigation_link: NavigationLink2
}

export interface NavigationLink2 {
    link_type: string
    link_id: string
    label: string
    subtask_id: string
}

export interface OpenLink {
    link: Link
}

export interface Link {
    link_type: string
    link_id: string
    url: string
}

export interface Error {
    code: number
    message: string
}
