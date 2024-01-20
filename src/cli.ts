#! /usr/bin/env node

// PACKAGES
import { Command } from 'commander';
import { Auth } from './';

// Creating a new commandline program
const program = new Command();

// Setting program details
program.name('rettiwt-auth').description('A CLI tool for authenticating against Twitter API');

// Guest
program
	.command('guest')
	.description('Generated authentcation credentials for a guest user')
	.option('-h, --header', 'Generate the credentials as HTTP headers')
	.action((options: { header?: boolean }) => {
		// Generating and returning the credentials
		new Auth()
			.getGuestCredential()
			.then((res) => {
				let creds;

				// If credentials required as headers
				if (options.header) {
					creds = JSON.stringify(res.toHeader(), null, 4);
				}
				// If credentials required as token
				else {
					creds = res.guestToken;
				}

				console.log(creds);
			})
			.catch((err) => console.log(err));
	});

// User
program
	.command('user')
	.description('Generate authentication credentials for a Twitter user')
	.argument('<email>', 'The email id of the Twitter account')
	.argument('<username>', 'The username associated with the Twitter account')
	.argument('<password>', 'The password to the Twitter account')
	.option('-h, --header', 'Generate the credentials as HTTP headers')
	.action((email: string, username: string, password: string, options: { header?: boolean }) => {
		// Logging in and returning the credentials
		new Auth()
			.getUserCredential({
				email: email,
				userName: username,
				password: password,
			})
			.then((res) => {
				let creds;

				// If credentials required as headers
				if (options.header) {
					creds = JSON.stringify(res.toHeader(), null, 4);
				}
				// If credentials required as api key
				else {
					creds = Buffer.from(res.toHeader().cookie ?? '').toString('base64');
				}

				console.log(creds);
			})
			.catch((err) => console.log(err));
	});

// Finalizing the CLI
program.parse();
