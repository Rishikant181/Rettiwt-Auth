# Rettiwt-Auth

A CLI tool for authenticating against Twitter API

## Prerequisites

-   NodeJS 20.9.0

## Installation

The package is intended to be installed globally.

-   For installation via npm, use the command: `npm install -g rettiwt-auth`
-   For installation via yarn, use the command: `yarn global add rettiwt-auth`

## Types of authentication

The following are the two types of authentcation methods available, with each method providing access to different set of resources:

1. **Guest Authentication**, with which, the following resources can be accessed:
    - Tweet Details
    - User Details
    - User Tweets
    - User Tweets and Replies
2. **User Authentication**, with which, the following resources can be accessed:
    - Tweet Details
    - Tweet Likes
    - Tweet Retweets
    - Tweet Search
    - User Details
    - User Followers
    - User Following
    - User Likes
    - User Tweets
    - User Tweets and Replies

## Getting started

The following examples demonstrate authenticating against Twitter API and generating the credentials.

### 1. Generating credentials as an API key (for use with [Rettiwt-API](https://github.com/Rishikant181/Rettiwt-API))

1.  Install the package globally by following the steps in the 'Installation' section.
2.  Open a commandline/shell and use the command:  
    `rettiwt-auth generate -o api_key.txt <email> <username> <password>`

    Where,

    -   \<email\> is the email to the Twitter account.
    -   \<username\> is the username associated with the Twitter account.
    -   \<password\> is the password to the Twitter account.

    The '-o' option specifies the CLI to save the output API key to a new text file called 'api_key.txt'.  
    If you do not specify the '-o' option, the API key is output to console instead.

3.  Store the generated API key in a safe spot for later use.

### 2. Generating credentials as HTTP headers (for use with third-party scripts)

1.  Install the package globally by following the steps in the 'Installation' section.
2.  Open a commandline/shell and use the command:  
    `rettiwt-auth generate -h -o auth_headers.json <email> <username> <password>`

    Where,

    -   \<email\> is the email to the Twitter account.
    -   \<username\> is the username associated with the Twitter account.
    -   \<password\> is the password to the Twitter account.

    The '-h' option specifies the CLI to generate the credentials as HTTP headers.  
    The '-o' option specifies the CLI to save the output HTTP headers to a new JSON file called 'auth_headers.json'.  
    If you do not specify the '-o' option, the HTTP headers are output to console instead.

3.  Store the generated API key in a safe spot for later use.
4.  For authenticating the requests to Twitter, append the headers to outgoing HTTP requests.

## Additional CLI options

-   To get a list of all commands available, use the command:  
    `rettiwt-auth help`
-   To check the description of single command, use the command:  
    `rettiwt-auth help <command_name>`

    Where,

    -   <command_name> is the name of a specific command from the list of available commands

## Credential Validity

When you generate the credentials as API key/HTTP headers,

-   The generated API key/HTTP headers are valid for a duration of 1 year, starting from the day of generation.
-   As such, it is suggested to generated the API key/HTTP headers once, then store them in a safe place (such as in an environment variable or a JSON file).

    **Notes:**

    -   Repeated logins might trigger Twitter's anti-bot measures and you might be required to verify yourself as human by logging in from the browser, before being able to use the package again.
    -   Therefore make sure to always generate the API key/HTTP headers only once and use it till it expires, before generating a new API key/authentication credential.

-   Whenever it is required to authenticate against Twitter API, use the stored API key/HTTP headers.

## API Reference

The complete API reference can be found [this](https://rishikant181.github.io/Rettiwt-Auth/) page
