#! /usr/bin/env node

// PACKAGES
import { writeFileSync } from 'fs';
import { Command } from 'commander';
import { Auth } from './';

// Creating a new commandline program
const program = new Command();

// Setting program details
program.name('rettiwt-auth').description('A CLI tool for authenticating against Twitter API');

/**
 * This command generates the authentication credentials for authenticating againg Twitter API.
 */
program
	.command('generate')
	.description('Generate authentication credentials for the given Twitter account')
	.argument('<email>', 'The email id of the Twitter account')
	.argument('<username>', 'The username associated with the Twitter account')
	.argument('<password>', 'The password to the Twitter account')
	.option('-o, --output <string>', 'Save the credentials to a json file with the given name')
	.option('-h, --header', 'Generate the credentials as HTTP headers')
	.action((email: string, username: string, password: string, options: { output?: string; header: boolean }) => {
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
					creds = JSON.stringify(res.toHeader());
				}
				// If credentials required as api key
				else {
					creds = Buffer.from(res.toHeader().cookie ?? '').toString('base64');
				}

				// If credentials are to be output to file
				if (options.output) {
					writeFileSync(`${options.output}`, creds);
				}
				// Else outputting credentials to console
				else {
					console.log(creds);
				}
			})
			.catch((err) => console.log(err));
	});

// Finalizing the CLI
program.parse();
