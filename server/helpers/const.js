let apiUrlv1='/api/v1'
let apiUrlv1auth =`${apiUrlv1}/auth`
let apiUrlv1authLogin =`${apiUrlv1auth}/login`
let apiUrlv1authSignup =`${apiUrlv1auth}/signup`
let apiUrlv1messages =`${apiUrlv1}/messages`
let apiUrlv1messagesUnread = `${apiUrlv1messages}/unread`
let apiUrlv1messagesSent = `${apiUrlv1messages}/sent`
let apiUrlv1messagesAction = `${apiUrlv1messages}/:id`
export {
apiUrlv1authLogin,
apiUrlv1authSignup,
apiUrlv1messages,
apiUrlv1messagesUnread,
apiUrlv1messagesSent,
apiUrlv1messagesAction
}