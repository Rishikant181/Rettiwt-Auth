export interface Root {
	flow_token: string;
	status: string;
	subtasks: Subtask[];
	errors: Error[];
}

export interface Subtask {
	subtask_id: string;
	enter_text: EnterText;
	subtask_back_navigation: string;
}

export interface EnterText {
	primary_text: PrimaryText;
	secondary_text: SecondaryText;
	hint_text: string;
	multiline: boolean;
	auto_capitalization_type: string;
	auto_correction_enabled: boolean;
	keyboard_type: string;
	next_link: NextLink;
}

export interface PrimaryText {
	text: string;
	entities: any[];
}

export interface SecondaryText {
	text: string;
	entities: any[];
}

export interface NextLink {
	link_type: string;
	link_id: string;
	label: string;
}

export interface Error {
	code: number;
	message: string;
}
