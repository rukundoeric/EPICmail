const apiUrlv2 = '/api/v2';
// All api for v2
const apiUrlv2auth = `${apiUrlv2}/auth`;
const apiUrlv2authLogin = `${apiUrlv2auth}/login`;
const apiUrlv2authSignup = `${apiUrlv2auth}/signup`;
const apiUrlv2authVerification = `${apiUrlv2authSignup}/:email/:code`;
const apiUrlv2messages = `${apiUrlv2}/messages`;
const apiUrlv2messagesUnread = `${apiUrlv2messages}/unread`;
const apiUrlv2messagesSent = `${apiUrlv2messages}/sent`;
const apiUrlv2messagesAction = `${apiUrlv2messages}/:id`;
const apiUrlv2createGroup = `${apiUrlv2}/groups`;
const apiUrlv2deleteGroup = `${apiUrlv2}/groups/:id`;
const apiUrlv2AddUserToGroup = `${apiUrlv2}/groups/:groupid/users/:userid`;
const apiUrlv2DeleteUserFromGroup = `${apiUrlv2}/groups/:groupid/users/:userid`;
const apiUrlv2SendMessageToGroup = `${apiUrlv2}/groups/:groupid/messages`;
const apiUrlv2RenameGroup = `${apiUrlv2}/groups/:groupid`;

const apiUrlv2passwordReset      =  `${apiUrlv2}/auth/reset`;
const apiUrlv2ConfirmPasswordReset=`${apiUrlv2}/auth/reset/:userid`;
// Acccount Verification
const verification_link_development = 'http://localhost:7070/api/v2/auth/signup';
const verification_link_production = 'https://epicmaileric.herokuapp.com/api/v2/auth/signup';
// Password Reset
const reset_link_development= 'http://localhost:7070/api/v2/auth/reset';
const reset_link_production = 'https://epicmaileric.herokuapp.com/api/v2/auth/reset';
export {
  apiUrlv2authVerification,
  apiUrlv2authLogin,
  apiUrlv2authSignup,
  apiUrlv2messages,
  apiUrlv2messagesUnread,
  apiUrlv2messagesSent,
  apiUrlv2messagesAction,
  verification_link_development,
  verification_link_production,
  apiUrlv2createGroup,
  apiUrlv2deleteGroup,
  apiUrlv2AddUserToGroup,
  apiUrlv2DeleteUserFromGroup,
  apiUrlv2SendMessageToGroup,
  apiUrlv2RenameGroup,
  apiUrlv2passwordReset,
  apiUrlv2ConfirmPasswordReset,
  reset_link_development,
  reset_link_production
};
