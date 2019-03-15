# EPICmail
[![Build Status](https://travis-ci.org/rukundoeric/EPICmail.svg?branch=develop)](https://travis-ci.org/rukundoeric/EPICmail)
[![Coverage Status](https://coveralls.io/repos/github/rukundoeric/EPICmail/badge.svg)](https://coveralls.io/github/rukundoeric/EPICmail)
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


## EndPoints
* This the [link](https://epicmaileric.herokuapp.com/) which to access the api.
* This the [link](https://epicmaileric.herokuapp.com/docs/) which to access the api documentayion

Below are the colletion of routes.

### Users 

| Endpoint                   | Methods   | Functionalities        |
| ---------------------------|-----------|------------------------|
| /api/v1/auth/signup        | POST      | Signup                 |
| /api/v1/auth/login         | POST      | Login                  |

### Messages

| Endpoint                   | Methods   | Functionalities                    |
| ---------------------------|-----------|--------------------------------    |
| /api/v1/messages           | POST      | Send Message                       | 
| /api/v1/messages           | GET       | Get All Received Messages          |
| /api/v1/messages/unread    | GET       | Get All unread Received Messages   | 
| /api/v1/messages/sent      | GET       | Get All  Sent Messages             |
| /api/v1/messages/:id       | GET       | Get specific  Messages             |
| /api/v1/messages/:id       | DELETE    | Delete Messages                    |

## Technologies Used
* HTML5
* CSS3
* node js
* Express

