# Rettiwt-Auth

**A library for authenticating against Twitter API**

Rettiwt-Auth is a library that can be used to to get the necessary authentication tokens that can be used to authenticate against Twitter API.

---

## Prerequisites

-   NodeJS 18.14.2

---

## Installation

1.  Initialize a new npm project using the command **npm init**
2.  Install the package either via npm or yarn
    -   For **npm**, use the command **npm install --save rettiwt-auth**
    -   For **yarn**, use the command **yarn add rettiwt-auth**

---

## Types of authentication

Before getting started, it is important to know what are the different authentcation options available and what type of data can be accessed using each authentication method.

The following are the two types of authentcation methods available:

1. **Guest Authentication**, with which, the following can be achieved:
    - Initiation of login process
2. **User Authentication**, with which, the following data can be accessed:
    - Tweet Details
    - Tweet Likes
    - Tweet Retweets
    - Tweet Search
    - User Details
    - User Followers
    - User Following
    - User Likes
    - User Tweets

---

## Additional information

To learn more, please refer to the full documentation of the [Auth](https://rishikant181.github.io/Rettiwt-Auth/classes/Auth.html) class.

---

## Getting started

The following examples will help you to get started with using the library:

### 1. Authenticating as a guest user

```
import { Auth } from 'rettiwt-auth';

new Auth().getGuestCredential().then(credential => {
    ...
})
```

Where,

-   credential is the generated guest credential.

### 2. Authenticating as a logged-in user

```
import { Auth } from 'rettiwt-auth';

new Auth().getUserCredential({
    email: 'account_email',
    userName: 'account_username',
    password: 'account_password
}).then(credential => {
    ...
})
```

Where,

-   account_email is the email id associated with your Twitter account.
-   account_username is the username associated with your Twitter account.
-   account_password is the password to your Twitter account.
-   credential is the generated user credential.

---

## Authenticating against Twitter API

After the credentials have been generated:

1.  Generate the credential using any one of the two methods given above.
2.  Use the [toHeader()](https://rishikant181.github.io/Rettiwt-Auth/classes/AuthCredential.html#toHeader) method on the returned credential, which converts the credential into HTTP headers.
3.  Add the returned HTTP headers to the headers of the requests made to Twitter API.

---

## CLI Usage

You may also use it from the CLI, without using library functions. This is the recommended approach when using this with [Rettiwt-API](https://www.npmjs.com/package/rettiwt-api) for fetching data from Twitter. To login:

-   Install the package globally using the command:  
    `npm -g install rettiwt-auth`  
    **or**  
    `yarn global add rettiwt-auth`
-   Open a commandline/shell and use the command:  
    `login <email> <username> <password>`

Where,

-   \<email\> is the email to the Twitter account.
-   \<username\> is the username associated with the Twitter account.
-   \<password\> is the password to the Twitter account.

The generated credentials can then be used to authenticate requests to Twitter by passing in the respective headers.

---
