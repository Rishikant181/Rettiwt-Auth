#! /usr/bin/env node

// PACKAGES
import { Auth } from './';

// Getting the account credentials from commandline args
const email: string = process.argv[2];
const userName: string = process.argv[3];
const password: string = process.argv[4];

// Logging in and returning the credentials
new Auth()
	.getUserCredential({
		email: email,
		userName: userName,
		password: password,
	})
	.then((res) => {
		// Converting the cookies to base64 encoded API key
		const apiKey: string = Buffer.from(res.toHeader().cookie ?? '').toString('base64');

		console.log(apiKey);
	})
	.catch((err) => console.log(err));
