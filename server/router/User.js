import express from 'express';
import User from '../db/controllers/User';
import verfic from '../db/helpers/emailVerfication';
import reset from '../db/helpers/passwordReset';
import {
  apiUrlv2authSignup, 
  apiUrlv2authLogin, 
  apiUrlv2authVerification,
  apiUrlv2passwordReset,
  apiUrlv2ConfirmPasswordReset,
} from '../helpers/const';
const router = express.Router();
router.post(`${apiUrlv2authSignup}`, User.signup,verfic.sendVerification);
router.post(`${apiUrlv2authVerification}`, User.account_verification);
router.post(`${apiUrlv2authLogin}`, User.login);
router.post(`${apiUrlv2passwordReset}`, User.passwordReset,reset.sendResetPasswordLink);
router.post(`${apiUrlv2ConfirmPasswordReset}`, User.confirmpasswordReset);
export default router;