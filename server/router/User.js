import express from 'express';
import user from '../controllers/User';
import userdb from '../db/controllers/User';
import {apiUrlv1authLogin, apiUrlv1authSignup ,apiUrlv2authSignup, apiUrlv2authLogin} from '../helpers/const'
const router = express.Router();
router.get('/api/v1/users', user.getAllUser);
//API version1
router.post(`${apiUrlv1authSignup}`, user.createUser);
router.post(`${apiUrlv1authLogin}`, user.login);

//API version2
// router.post(`${apiUrlv2authSignup}`, userdb.createUser);
// router.post(`${apiUrlv2authLogin}`, userdb.login);
export default router;