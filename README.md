# EPICmail
[![Build Status](https://travis-ci.org/rukundoeric/EPICmail.svg?branch=develop)](https://travis-ci.org/rukundoeric/EPICmail)
[![Coverage Status](https://coveralls.io/repos/github/rukundoeric/EPICmail/badge.svg?branch=develop)](https://coveralls.io/github/rukundoeric/EPICmail?branch=develop)
<a href="https://codeclimate.com/github/rukundoeric/EPICmail/maintainability"><img src="https://api.codeclimate.com/v1/badges/5860d50e9b94c5eaa985/maintainability" /></a>

<a href="https://rukundoeric.github.io/EPICmail/UI/"><img width="50px" height="50px" src="https://firebasestorage.googleapis.com/v0/b/webtest-1995b.appspot.com/o/images%2Flogo.png?alt=media&token=7f378bf4-1466-4875-bbca-8d69290986e1"></a>

EPICmail is mailing platform which help users to share, send messages arround the world.

## Features
* User can create account
* User can Login
* User can reset his or her password
* Admin can create account and add users
* User can send message to group or individual
* User can read received messages
* User can retract sent message
* User can create Group and own it
* User owner can Add user to the group
* User owner can remove a user from the group 
* User owner can delete the group
* User owner can change group name
* User can reset his/her forgoten password

## EndPoints
* This the [link](https://epicmaileric.herokuapp.com/) which to access the api.
* This the [link](https://epicmaileric.herokuapp.com/docs/) which to access the api documentayion

Below are the colletion of routes.

### Users 

| Endpoint                            | Methods   | Functionalities           |
| ------------------------------------|-----------|---------------------------|
| /api/v2/auth/signup                 | POST      | Signup                    |
| /api/v2/auth/login                  | POST      | Login                     |
| /api/v2/auth/signup/:userid/:code   | POST      | Verifier Account          |
| /api/v2/auth/reset                  | POST      | Password Reset            |
| /api/v2/auth/reset/:userid          | POST      | Confirm Password Reset    | 

### Messages

| Endpoint                              | Methods   | Functionalities                    |
| --------------------------------------|-----------|------------------------------------|
| /api/v2/messages                      | POST      | Send Message                       | 
| /api/v2/messages                      | GET       | Get All Received Messages          |
| /api/v2/messages/unread               | GET       | Get All unread Received Messages   | 
| /api/v2/messages/sent                 | GET       | Get All  Sent Messages             |
| /api/v2/messages/:id                  | GET       | Get specific  Messages             |
| /api/v2/messages/:id                  | DELETE    | Delete Messages                    |


### Groups

| Endpoint                              | Methods   | Functionalities                    |
| --------------------------------------|-----------|------------------------------------|
| /api/v2/groups                        | POST      | Create a group                     |
| /api/v2/groups/:groupid/users/:userid | POST      | Add user to the group              |
| /api/v2/groups/:groupid/users/:userid | DELETE    | Remove User from the group         |
| /api/v2/groups/:groupid               | PATCH     | Change group name                  |
| /api/v2/groups/:groupid/messages      | POST      | Send Message to the group          |
| /api/v2/groups/:groupid               | DELETE    | Delete group                       |

## Technologies Used
* HTML5
* CSS3
* node js
* Express

## Installation
* clone this Repo https://github.com/rukundoeric/EPICmail
* Run `cd EPICmail` to navigation to project directory 
* Run `npm install` to install all packages
* Run `node server/config/start.js` to start the server
* And then Test with Postman

## Licence
MIT

Copyright(c) 2019 Rukundo Eric
