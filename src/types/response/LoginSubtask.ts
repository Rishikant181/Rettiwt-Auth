/* eslint-disable */

export interface Root {
	flow_token: string;
	status: string;
	subtasks: Subtask[];
	errors: Error[];
}

export interface Subtask {
	subtask_id: string;
}

export interface Error {
	code: number;
	message: string;
}
