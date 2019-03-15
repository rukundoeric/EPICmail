import ST from './status';
export default {
    MSG_WRONG_INPUTS : {'message':'Some values are missing'},
    MSG_NO_USER_EXIST : {'status':ST.NOT_FOUND,'message':'Email not registered, please signup!'},
    MSG_WRONG_PASSWORD : {'status':ST.OK,'message':'Incorrect Password'},
    MSG_INVALID_TOKEN : {'message':'Provided Token is invalid'},
    MSG_DATA_NOT_FOUND : {'message':'Not Found!!!'},
    MSG_DATA_MESSAGE_NOT_FOUND : {'message':'Not Found!!!'},
    MSG_DATA_INVALID_EMAIL : {'message':'Invalid Email'},
    MSG_USER_ALREAD_EXIST : {'message':'User already exists'},
    MSG_DATA_WEAK_PASSWORD : {'message':'Password is weak'},
    MSG_PRGS_MESSAGE_DELETE :{"message":"Unfortunately!! You are not sender or receiver of this message, so you can not delete it."},
    MSG_DEL_SUCCESSFUL : {"message":"Message Deleted Successful "},
    MSG_PRGS_MESSAGE_VIEW : {"message":"Unfortunately!! You are not sender or receiver of this message, so you can not open it."}  
}