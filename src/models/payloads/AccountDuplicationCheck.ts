// TYPES
import { IAccountDuplicationCheck } from "../../types/request/payloads/AccountDuplicationCheck";

/**
 * The input data to be sent for checking account duplication.
 */
export class AccountDuplicationCheckInput implements IAccountDuplicationCheck {
    link: string;

    constructor() {
        this.link = 'AccountDuplicationCheck_false';
    }
}