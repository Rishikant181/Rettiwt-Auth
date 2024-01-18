// PACKAGES
import axios, { AxiosError } from 'axios';

// ENUMS
import { ELoginUrls, ELoginSubtasks } from './enums/Login';

// TYPES
import { Root as IGuestTokenResponse } from './types/response/GuestToken';
import { Root as ILoginSubtaskResponse } from './types/response/LoginSubtask';

// MODELS
import { AuthCredential } from './models/data/AuthCredential';
import { AccountCredential } from './models/data/AccountCredential';
import { LoginSubtaskPayload } from './models/payloads/LoginSubtask';
import { EAuthenticationErrors } from './enums/Authentication';

/**
 * This class deals with authenticating against Twitter API.
 *
 * There are two authentication methods available:
 * 1. **Guest Authentication:**
 * This type of authentication does not require a Twitter account.
 * However, it offers limited functionality.
 * Use the {@link Auth.getGuestCredential} method to authenticate as a guest.
 *
 * 2. **User Authentication:**
 * This type of authentication requires a working Twitter account and offers a wider range of functionality.
 * Use the {@link Auth.getUserCredential} method to authenticate as a logged-in user.
 *
 * @public
 */
export class Auth {
	/** The current flow token. */
	private flowToken: string;

	/** The current auth credentials. */
	private cred: AuthCredential;

	/** The order in which the login subtasks must be executed. */
	private subtasks: ELoginSubtasks[];

	/**
	 * Initializes a new Auth instance and prepares it for the login process.
	 *
	 * @internal
	 */
	public constructor() {
		this.flowToken = '';
		this.cred = new AuthCredential();
		this.subtasks = [
			ELoginSubtasks.JS_INSTRUMENTATION,
			ELoginSubtasks.ENTER_USER_IDENTIFIER,
			ELoginSubtasks.ENTER_ALTERNATE_USER_IDENTIFIER,
			ELoginSubtasks.ENTER_PASSWORD,
			ELoginSubtasks.ACCOUNT_DUPLICATION_CHECK,
		];
	}

	/**
	 * Generates the apporpriate payload for the given login subtask and given data.
	 *
	 * @param subtask - The name of the subtask.
	 * @param flowToken - The flow token for the subtask.
	 * @param accCred - The account credentials to the Twitter account.
	 * @returns The requried payload.
	 *
	 * @internal
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
	 * Parses the incoming authentication error from Twitter API into a simplified message.
	 *
	 * @param error - The incoming error.
	 * @param flowName - The flow that was executed, which raised this error.
	 * @returns The simplified error message.
	 *
	 * @internal
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
	 * Initiates the login process and gets the required flow token and cookies for the login process.
	 *
	 * @internal
	 */
	private async initiateLogin(): Promise<void> {
		await axios
			.post<ILoginSubtaskResponse>(ELoginUrls.INITIATE_LOGIN, null, {
				headers: { ...this.cred.toHeader() },
			})
			.then((res) => {
				// Setting the flow token
				this.flowToken = res.data.flow_token;

				// Setting the cookie string of the auth credentials
				this.cred.cookies = (res.headers['set-cookie'] as string[]).join(';');
			});
	}

	/**
	 * Fetches the credentials that can be used to authenticate as a guest user.
	 *
	 * @returns The guest credentials.
	 *
	 * @public
	 *
	 * @example
	 * ```
	 * import { Auth } from 'rettiwt-auth';
	 *
	 * const auth = new Auth();
	 *
	 * auth.getGuestCredential()
	 * .then(credential => {
	 * 	// Use the credential to do something
	 * 	...
	 * })
	 * .catch(error => {
	 * 	// Log error message for debug purpose
	 * 	console.log(err);
	 * })
	 * ```
	 */
	public async getGuestCredential(): Promise<AuthCredential> {
		// Creating a new blank credential
		const cred: AuthCredential = new AuthCredential();

		// Getting the guest token
		await axios
			.post<IGuestTokenResponse>(ELoginUrls.GUEST_TOKEN, null, {
				headers: { ...cred.toHeader() },
			})
			.then((res) => {
				cred.guestToken = res.data.guest_token;
			});

		return cred;
	}

	/**
	 * Fetches the credentials that can be used to authenticate as a logged-in user.
	 *
	 * @param accCred - The credentials (email, username and password) to the Twitter account.
	 * @returns The user credentials.
	 *
	 * @public
	 *
	 * @example
	 * ```
	 * import { Auth } from 'rettiwt-auth';
	 *
	 * const auth = new Auth();
	 *
	 * new auth.getUserCredential({
	 * 	email: '<account_email>',
	 * 	userName: '<account_username>',
	 * 	password: '<account_password>'
	 * })
	 * .then(credential => {
	 * 	// Converting the credentials to HTTP headers.
	 * 	credentialHeaders = credential.toHeader();
	 *
	 * 	// Save the credential headers for later use
	 * 	...
	 * })
	 * .catch(error => {
	 * 	...
	 * })
	 * ```
	 *
	 * Where,
	 * - \<account_email\> is the email associated with the Twitter account.
	 * - \<account_username\> is the username associated with the Twitter account.
	 * - \<account_password\> is the password to the Twitter account.
	 *
	 * For authenticating requests, the credentialHeaders should be appended to outgoing HTTP requests to Twitter.
	 */
	public async getUserCredential(accCred: AccountCredential): Promise<AuthCredential> {
		// Creating a new guest credential
		this.cred = await this.getGuestCredential();

		// Initiating the login process
		await this.initiateLogin();

		// Executing the subtasks in the pre-defined order
		for (let i: number = 0; i < this.subtasks.length; i++) {
			// Preparing the subtask payload
			const payload: LoginSubtaskPayload = this.getSubtaskPayload(this.subtasks[i], this.flowToken, accCred);

			// Executing the subtask
			await axios
				.post<ILoginSubtaskResponse>(ELoginUrls.LOGIN_SUBTASK, payload, {
					headers: { ...this.cred.toHeader() },
				})
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
					this.flowToken = res.data.flow_token;

					// If this is the last subtask, namely ACCOUNT_DUPLICATION_CHECK, setting the AuthCredentials
					if (this.subtasks[i] == ELoginSubtasks.ACCOUNT_DUPLICATION_CHECK) {
						this.cred = new AuthCredential(res.headers['set-cookie'] as string[]);
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

		return this.cred;
	}
}
