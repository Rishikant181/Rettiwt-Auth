#! /usr/bin/env node

// PACKAGES
import { Command } from 'commander';
import { Auth } from './';

// Creating a new commandline program
const program = new Command();

// Setting program details
program.name('rettiwt-auth').description('A CLI tool to authenticate against Twitter API');

/**
 * login
 *
 * This command generates the authentication credentials for authenticating againg Twitter API.
 */
program
	.command('generate')
	.description('Generate authentication credentials for the given Twitter account')
	.argument('<email>', 'The email id of the Twitter account')
	.argument('<username>', 'The username associated with the Twitter account')
	.argument('<password>', 'The password to the Twitter account')
	.action((email: string, username: string, password: string) => {
		// Logging in and returning the credentials
		new Auth()
			.getUserCredential({
				email: email,
				userName: username,
				password: password,
			})
			.then((res) => {
				// Converting the cookies to base64 encoded API key
				const apiKey: string = Buffer.from(res.toHeader().cookie ?? '').toString('base64');

				console.log(apiKey);
			})
			.catch((err) => console.log(err));
	});

// Finalizing the CLI
program.parse();
