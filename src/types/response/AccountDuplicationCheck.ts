export interface Root {
	flow_token: string;
	status: string;
	subtasks: Subtask[];
}

export interface Subtask {
	subtask_id: string;
	open_account?: OpenAccount;
	open_link?: OpenLink;
	open_home_timeline?: OpenHomeTimeline;
}

export interface OpenAccount {
	user: User;
	next_link: NextLink;
	attribution_event: string;
}

export interface User {
	id: number;
	id_str: string;
	name: string;
	screen_name: string;
}

export interface NextLink {
	link_type: string;
	link_id: string;
	subtask_id: string;
}

export interface OpenLink {
	link: Link;
}

export interface Link {
	link_type: string;
	link_id: string;
	subtask_id: string;
}

export interface OpenHomeTimeline {
	next_link: NextLink2;
}

export interface NextLink2 {
	link_type: string;
	link_id: string;
}
