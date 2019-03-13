import express from 'express';
import user from '../controllers/User';
import auth from '../middleware/auth';
import {apiUrlv1authLogin, apiUrlv1authSignup} from '../helpers/const'
const router = express.Router();
router.get('/api/v1/users', user.getAllUser);
router.post(`${apiUrlv1authSignup}`, user.createUser);
router.post(`${apiUrlv1authLogin}`, user.login);
export default router;