import express from 'express';
import user from '../controllers/User';
import dbUser from '../db/controllers/User';
import verfic from '../db/helpers/emailVerfication';
import reset from '../db/helpers/passwordReset';
import {apiUrlv1authLogin, 
  apiUrlv1authSignup ,
  apiUrlv2authSignup, 
  apiUrlv2authLogin, 
  apiUrlv2authVerification,
  apiUrlv2passwordReset,
  apiUrlv2ConfirmPasswordReset} from '../helpers/const'
const router = express.Router();
router.get('/api/v1/users', user.getAllUser);
//API version1
router.post(`${apiUrlv1authSignup}`, user.createUser);
router.post(`${apiUrlv1authLogin}`, user.login);
router.get('/testCon', verfic.sendVerification);
//API version2
router.post(`${apiUrlv2authSignup}`, dbUser.signup,verfic.sendVerification);
router.post(`${apiUrlv2authVerification}`, dbUser.account_verification);
router.post(`${apiUrlv2authLogin}`, dbUser.login);
router.post(`${apiUrlv2passwordReset}`, dbUser.passwordReset,reset.sendResetPasswordLink);
router.post(`${apiUrlv2ConfirmPasswordReset}`, dbUser.confirmpasswordReset);
export default router;