import express from 'express';
import user from '../controllers/User';
import auth from '../middleware/auth';
import {apiUrlv1authLogin, apiUrlv1authSignup} from '../helpers/const'
const router = express.Router();
router.post(`${apiUrlv1authSignup}`, user.createUser);
export default router;