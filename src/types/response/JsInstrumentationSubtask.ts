export interface Root {
    flow_token: string
    status: string
    subtasks: Subtask[]
}

export interface Subtask {
    subtask_id: string
    settings_list?: SettingsList
    subtask_back_navigation?: string
    single_sign_on?: SingleSignOn
    open_link?: OpenLink
}

export interface SettingsList {
    settings: Setting[]
    detail_text: DetailText
    style: string
    header: Header
    navigation_style: string
    horizontal_style: string
}

export interface Setting {
    value_type: string
    value_identifier: string
    value_data: ValueData
}

export interface ValueData {
    button?: Button
    separator?: Separator
    text_field?: TextField
}

export interface Button {
    navigation_link: NavigationLink
    style: string
    preferred_size: string
    icon?: Icon
}

export interface NavigationLink {
    link_type: string
    link_id: string
    label: string
    subtask_id?: string
}

export interface Icon {
    icon: string
}

export interface Separator {
    label: Label
}

export interface Label {
    text: string
    entities: any[]
}

export interface TextField {
    content_type: string
    hint_text: string
}

export interface DetailText {
    text: string
    entities: Entity[]
}

export interface Entity {
    from_index: number
    to_index: number
    navigation_link: NavigationLink2
}

export interface NavigationLink2 {
    link_type: string
    link_id: string
    url: string
}

export interface Header {
    primary_text: PrimaryText
}

export interface PrimaryText {
    text: string
    entities: any[]
}

export interface SingleSignOn {
    provider: string
    scopes: string[]
    state: string
    next_link: NextLink
    fail_link: FailLink
    cancel_link: CancelLink
}

export interface NextLink {
    link_type: string
    link_id: string
}

export interface FailLink {
    link_type: string
    link_id: string
    subtask_id: string
}

export interface CancelLink {
    link_type: string
    link_id: string
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
