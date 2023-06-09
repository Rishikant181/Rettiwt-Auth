export interface Root {
	flow_token: string;
	status: string;
	subtasks: Subtask[];
}

export interface Subtask {
	subtask_id: string;
	js_instrumentation: JsInstrumentation;
}

export interface JsInstrumentation {
	url: string;
	timeout_ms: number;
	next_link: NextLink;
}

export interface NextLink {
	link_type: string;
	link_id: string;
}
