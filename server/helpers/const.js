let apiUrlv1='/api/v1'
let apiUrlv2='/api/v2'

//All api for v1
let apiUrlv1auth =`${apiUrlv1}/auth`
let apiUrlv1authLogin =`${apiUrlv1auth}/login`
let apiUrlv1authSignup =`${apiUrlv1auth}/signup`
let apiUrlv1messages =`${apiUrlv1}/messages`
let apiUrlv1messagesUnread = `${apiUrlv1messages}/unread`
let apiUrlv1messagesSent = `${apiUrlv1messages}/sent`
let apiUrlv1messagesAction = `${apiUrlv1messages}/:id`

//All api for v2
let apiUrlv2auth =`${apiUrlv2}/auth`
let apiUrlv2authLogin =`${apiUrlv2auth}/login`
let apiUrlv2authSignup =`${apiUrlv2auth}/signup`
let apiUrlv2authVerification = `${apiUrlv2auth}/verifier`
let apiUrlv2messages =`${apiUrlv2}/messages`
let apiUrlv2messagesUnread = `${apiUrlv2messages}/unread`
let apiUrlv2messagesSent = `${apiUrlv2messages}/sent`
let apiUrlv2messagesAction = `${apiUrlv2messages}/:id`

export {
apiUrlv1authLogin,
apiUrlv1authSignup,
apiUrlv1messages,
apiUrlv1messagesUnread,
apiUrlv1messagesSent,
apiUrlv1messagesAction,
apiUrlv2authVerification,
apiUrlv2authLogin,
apiUrlv2authSignup,
apiUrlv2messages,
apiUrlv2messagesUnread,
apiUrlv2messagesSent,
apiUrlv2messagesAction
}