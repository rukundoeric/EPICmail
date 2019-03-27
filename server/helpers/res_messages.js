import ST from './status';

export default {
  MSG_WRONG_INPUTS: { message: 'Some values are missing' },
  MSG_NO_USER_EXIST: { status: ST.NOT_FOUND, message: 'Email not registered, please signup!' },
  MSG_WRONG_PASSWORD: { status: ST.OK, message: 'Incorrect Password' },
  MSG_INVALID_TOKEN: { message: 'Provided Token is invalid' },
  MSG_DATA_NOT_FOUND: { message: 'Not Found!!!' },

  MSG_DATA_MESSAGE_NOT_FOUND: { message: 'Message Not Found.' },

  MSG_DATA_SENT_MESSAGE_NOT_FOUND: { message: 'You have not any sent Message.'},
  MSG_DATA_UNREAD_MESSAGE_NOT_FOUND: { message: 'You have not any unread Message.'},
  MSG_DATA_RECEIVED_MESSAGE_NOT_FOUND: { message: 'You have not any received Message.'},


  MSG_DATA_GROUP_NOT_FOUND: { message: 'Group Not Found.'},


  MSG_DATA_INVALID_EMAIL: { message: 'Invalid Email' },
  MSG_USER_ALREAD_EXIST: { message: 'User already exists' },
  MSG_DATA_WEAK_PASSWORD: { message: 'Password is weak' },
  MSG_PRGS_MESSAGE_DELETE: { message: 'Unfortunately!! You are not sender or receiver of this message, so you can not delete it.' },
  MSG_DEL_SUCCESSFUL: { message: 'Message Deleted Successful ' },
  MSG_GROUP_DELETED_SUCCESSFUL: { message: 'Group Deleted successfuly ' },
  MSG_GROUP_ALEADY_EXIST: { message: 'Group with that name alread exist' },
  MSG_GROUP_MEMBER_DELETED_SUCCESSFUL: { message: 'Member group deleted successfuly' },
  MSG_GROUP_NAME_UPDATED: { message: 'Group Name Updated successfuly' },
  MSG_PRGS_MESSAGE_VIEW: { message: 'Unfortunately!! You are not sender or receiver of this message, so you can not open it.' },
  MSG_PRGS_DELETE_GROUP: { message: 'Unfortunately!! You are not the owner of this group, so you can not delete it.' },
  MSG_PRGS_ADD_USER_GROUP: { message: 'Unfortunately!! You are not the owner of this group, so you can not add user to this group.' },
  MSG_PRGS_DELETE_USER_GROUP: { message: 'Unfortunately!! You are not the owner of this group, so you can not remove any user from it.' },
};
