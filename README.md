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

1. **Guest Authentication**, with which, the following data can be accessed:
    - Tweet Details
    - User Details
    - User Tweets
2. **User Authentication**, with which, the following data, in addition to guest, can be accessed:
    - Tweet Likes
    - Tweet Retweets
    - Tweet Search
    - User Followers
    - User Following
    - User Likes

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
