# Rettiwt-Auth

A CLI tool for authenticating against Twitter API

## Prerequisites

-   NodeJS 20.x

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
    - Create Tweet
    - Create Retweet
    - Favorite Tweet
    - List Details
    - List Tweets
    - Media Upload
    - Space Details
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
    - Video Stream

## Getting started

The following examples demonstrate authenticating against Twitter API and generating the credentials.

### 1. Generating an API key (for use with [Rettiwt-API](https://github.com/Rishikant181/Rettiwt-API))

1.  Install the package globally by following the steps in the 'Installation' section.
2.  Open a commandline/shell and use the command:  
    `rettiwt-auth user <email> <username> <password>`

    Where,

    -   `<email>` is the email to the Twitter account.
    -   `<username>` is the username associated with the Twitter account.
    -   `<password>` is the password to the Twitter account.

3.  Store the generated API key in a safe spot for later use.

### 2. Generating credentials as HTTP headers (for use with third-party scripts)

1.  Install the package globally by following the steps in the 'Installation' section.
2.  Open a commandline/shell and use the command:  
    `rettiwt-auth user -h <email> <username> <password>`

    Where,

    -   `<email>` is the email to the Twitter account.
    -   `<username>` is the username associated with the Twitter account.
    -   `<password>` is the password to the Twitter account.

    The `-h` option specifies the CLI to generate the credentials as HTTP headers.

3.  Store the generated API key in a safe spot for later use.
4.  For authenticating the requests to Twitter, append the headers to outgoing HTTP requests.

## Using a proxy

In order to use a proxy while creating either 'guest' or 'user' credentials, use the option `-p <URL_to_proxy>` or `--proxy <URL_to_proxy>` to specify the proxy server to use. The following snippet demonstrates using a proxy for generating 'user' credentials:

`rettiwt-auth user -p <URL> <email> <username> <password>`

Where,

-   `<URL>` is he URL to the proxy server to use.
-   `<email>` is the email to the Twitter account.
-   `<username>` is the username associated with the Twitter account.
-   `<password>` is the password to the Twitter account.

## Additional CLI options

-   To get a list of all commands available, use the command:  
    `rettiwt-auth help`
-   To check the description of single command, use the command:  
    `rettiwt-auth help <command_name>`

    Where,

    -   `<command_name>` is the name of a specific command from the list of available commands

## Credential Validity

When you generate the credentials as API key/HTTP headers,

-   The generated API key/HTTP headers are valid for a duration of 1 year, starting from the day of generation.
-   As such, it is suggested to generated the API key/HTTP headers once, then store them in a safe place (such as in an environment variable or a JSON file).

    **Notes:**

    -   Repeated logins might trigger Twitter's anti-bot measures and you might be required to verify yourself as human by logging in from the browser, before being able to use the package again.
    -   Therefore make sure to always generate the API key/HTTP headers only once and use it till it expires, before generating a new API key/authentication credential.

-   Whenever it is required to authenticate against Twitter API, use the stored API key/HTTP headers.
