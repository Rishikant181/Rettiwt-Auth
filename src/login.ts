// MODELS
import { AccountCredential } from "./models/AccountCredential";
import { AuthCredential } from "./models/AuthCredential";

export async function login(cred?: AccountCredential): Promise<AuthCredential> {
    // If credentials is supplies => account login
    if (cred) {

    }
}