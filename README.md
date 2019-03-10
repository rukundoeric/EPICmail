# EPICmail
[![Build Status](https://travis-ci.org/rukundoeric/EPICmail.svg?branch=develop)](https://travis-ci.org/rukundoeric/EPICmail)
[![Coverage Status](https://coveralls.io/repos/github/rukundoeric/EPICmail/badge.svg)](https://coveralls.io/github/rukundoeric/EPICmail)
<a href="https://codeclimate.com/github/rukundoeric/EPICmail/maintainability"><img src="https://api.codeclimate.com/v1/badges/5860d50e9b94c5eaa985/maintainability" /></a>

<a href="https://rukundoeric.github.io/EPICmail/UI/"><img width="50px" height="50px" src="https://firebasestorage.googleapis.com/v0/b/webtest-1995b.appspot.com/o/images%2Flogo.png?alt=media&token=7f378bf4-1466-4875-bbca-8d69290986e1"></a>

EPICmail is a web mail that help users to send and receive emails all over the world

* UI Templete 
    1. Users https://rukundoeric.github.io/EPICmail/UI/
    2. Admin https://rukundoeric.github.io/EPICmail/UI/html/admin/manage_groups.html
* Front End https://epicmaileric.herokuapp.com/

* API Documentations https://epicmaileric.herokuapp.com/docs

## API Endpoints

| API                      | Method        | Functionalities                |
| -------------            | ------------- | -------------------------------|     
| /api/v1/messages         | POST          | Send New Message               |
| /api/v1/messages         | GET           | Get All Received Messages      |
| /api/v1/messages/uread   | GET           | Get All Unread Messages        |
| /api/v1/messages/sent    | GET           | Get All Sent Messages          |
| /api/v1/messages/`<id>`  | GET           | Get Specified Message by id    |
| /api/v1/messages/`<id>`  | DELETE        | Delete Specified Message by id |

### Open API documentation

<a href="https://epicmaileric.herokuapp.com/"><img width="50px" height="50px" src="https://firebasestorage.googleapis.com/v0/b/webtest-1995b.appspot.com/o/images%2Flogo.png?alt=media&token=7f378bf4-1466-4875-bbca-8d69290986e1"></a>
