// PACKAGES
import axios, { AxiosError, AxiosResponse } from 'axios';
import https, { Agent } from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';

// ENUMS
import { ELoginUrls, ELoginSubtasks } from './enums/Login';

// TYPES
import { IAuthConfig } from './types/AuthConfig';
import { Root as IGuestTokenResponse } from './types/response/GuestToken';
import { Root as ILoginSubtaskResponse } from './types/response/LoginSubtask';

// MODELS
import { AuthCredential } from './models/data/AuthCredential';
import { AccountCredential } from './models/data/AccountCredential';
import { LoginSubtaskPayload } from './models/payloads/LoginSubtask';
import { EAuthenticationErrors } from './enums/Authentication';

/**
 * This class deals with authenticating against Twitter API.
 */
export class Auth {
	/** The HTTPS Agent to use for requests to Twitter API. */
	private readonly httpsAgent: Agent;

	/** The order in which the login subtasks must be executed. */
	private subtasks: ELoginSubtasks[];

	/**
	 * @param config - The config object.
	 */
	public constructor(config?: IAuthConfig) {
		this.httpsAgent = config?.proxyUrl ? new HttpsProxyAgent(config.proxyUrl) : new https.Agent();
		this.subtasks = [
			ELoginSubtasks.JS_INSTRUMENTATION,
			ELoginSubtasks.ENTER_USER_IDENTIFIER,
			ELoginSubtasks.ENTER_ALTERNATE_USER_IDENTIFIER,
			ELoginSubtasks.ENTER_PASSWORD,
			ELoginSubtasks.ACCOUNT_DUPLICATION_CHECK,
		];
	}

	/**
	 * @param subtask - The name of the subtask.
	 * @param flowToken - The flow token for the subtask.
	 * @param accCred - The account credentials to the Twitter account.
	 *
	 * @returns The appropriate payload for the given subtask.
	 */
	private getSubtaskPayload(
		subtask: ELoginSubtasks,
		flowToken: string,
		accCred: AccountCredential,
	): LoginSubtaskPayload {
		if (subtask == ELoginSubtasks.ENTER_USER_IDENTIFIER) {
			return new LoginSubtaskPayload(subtask, flowToken, accCred.email);
		} else if (subtask == ELoginSubtasks.ENTER_ALTERNATE_USER_IDENTIFIER) {
			return new LoginSubtaskPayload(subtask, flowToken, accCred.userName);
		} else if (subtask == ELoginSubtasks.ENTER_PASSWORD) {
			return new LoginSubtaskPayload(subtask, flowToken, accCred.password);
		} else {
			return new LoginSubtaskPayload(subtask, flowToken);
		}
	}

	/**
	 * Executes the given login subtask.
	 *
	 * @param url - The URL against which the subtask is to be executed.
	 * @param payload - The payload to be sent.
	 *
	 * @returns The response received from executing the subtask.
	 */
	private async executeSubtask<ResponseType>(
		url: ELoginUrls,
		credential: AuthCredential,
		payload?: NonNullable<unknown>,
	): Promise<AxiosResponse<ResponseType>> {
		return await axios.post<ResponseType>(url, payload, {
			headers: { ...credential.toHeader() },
			httpsAgent: this.httpsAgent,
		});
	}

	/**
	 * Parses the incoming authentication error from Twitter API into a simplified message.
	 *
	 * @param error - The incoming error.
	 * @param flowName - The flow that was executed, which raised this error.
	 *
	 * @returns The simplified error message.
	 */
	private parseAuthError(error: AxiosError<ILoginSubtaskResponse>, flowName: ELoginSubtasks): EAuthenticationErrors {
		/** The error message to throw. */
		let errorMessage: EAuthenticationErrors = EAuthenticationErrors.AUTHENTICATION_FAILED;

		// If there is any error related to login
		if (error.response?.data.errors[0].code == 399) {
			// If email error
			if (flowName == ELoginSubtasks.ENTER_USER_IDENTIFIER) {
				errorMessage = EAuthenticationErrors.INVALID_EMAIL;
			}
			// If username error
			else if (flowName == ELoginSubtasks.ENTER_ALTERNATE_USER_IDENTIFIER) {
				errorMessage = EAuthenticationErrors.INVALID_USERNAME;
			}
			// If password error
			else if (flowName == ELoginSubtasks.ENTER_PASSWORD) {
				errorMessage = EAuthenticationErrors.INVALID_PASSWORD;
			}
		}

		return errorMessage;
	}

	/**
	 * @returns A new 'guest' credential.
	 */
	public async getGuestCredential(): Promise<AuthCredential> {
		// Creating a new blank credential
		const cred: AuthCredential = new AuthCredential();

		// Getting the guest token
		await this.executeSubtask<IGuestTokenResponse>(ELoginUrls.GUEST_TOKEN, cred, undefined).then((res) => {
			cred.guestToken = res.data.guest_token;
		});

		return cred;
	}

	/**
	 * @param accCred - The credentials (email, username and password) to the Twitter account.
	 *
	 * @returns The 'user' credentials for the given Twitter account.
	 */
	public async getUserCredential(accCred: AccountCredential): Promise<AuthCredential> {
		let cred: AuthCredential = await this.getGuestCredential();
		let flowToken: string = '';

		// Initiating the login process
		await this.executeSubtask<ILoginSubtaskResponse>(ELoginUrls.INITIATE_LOGIN, cred, undefined).then((res) => {
			// Setting the flow token
			flowToken = res.data.flow_token;

			// Setting the cookie string of the auth credentials
			cred.cookies = (res.headers['set-cookie'] as string[]).join(';');
		});

		// Executing the subtasks in the pre-defined order
		for (let i: number = 0; i < this.subtasks.length; i++) {
			// Preparing the subtask payload
			const payload: LoginSubtaskPayload = this.getSubtaskPayload(this.subtasks[i], flowToken, accCred);

			// Executing the subtask
			await this.executeSubtask<ILoginSubtaskResponse>(ELoginUrls.LOGIN_SUBTASK, cred, payload)
				.then((res) => {
					/**
					 * After the execution of ENTER_USER_IDENTIFIER subtask, two outcomes are possible:
					 *
					 * 1. Twitter API asks username, then asks for password
					 * 2. Twitter API directly asks for password, skipping username check
					 *
					 * Therefore, it is checked if Twitter API is asking for password after ENTER_USER_IDENTIFIER subtask.
					 *
					 * If yes, then the next subtask (ENTER_ALTERNATE_USER_IDENTIFIER) is skipped and ENTER_PASSWORD subtask is run directly.
					 */
					if (
						this.subtasks[i] == ELoginSubtasks.ENTER_USER_IDENTIFIER &&
						res.data.subtasks.map((subtask) => subtask.subtask_id).includes(ELoginSubtasks.ENTER_PASSWORD)
					) {
						i++;
					}

					// Getting the flow token required for next subtask
					flowToken = res.data.flow_token;

					// If this is the last subtask, namely ACCOUNT_DUPLICATION_CHECK, setting the AuthCredentials
					if (this.subtasks[i] == ELoginSubtasks.ACCOUNT_DUPLICATION_CHECK) {
						cred = new AuthCredential(res.headers['set-cookie'] as string[]);
					}
				})
				/**
				 * Catching any error that might have arised in the authentication process.
				 *
				 * Then parsing that error to generate a simplified error message, which is then thrown.
				 */
				.catch((err: AxiosError<ILoginSubtaskResponse>) => {
					throw new Error(this.parseAuthError(err, this.subtasks[i]));
				});
		}

		return cred;
	}
}
