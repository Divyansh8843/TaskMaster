import express from 'express';
import { googleLogin, logout, refresh, getProfile, login, register } from '../controllers/authController';

import { protect, admin } from '../middlewares/authMiddleware';


const router = express.Router();

router.post('/google', googleLogin);
router.post('/register', register);
router.post('/login', login);

router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);
router.get('/admin', protect, admin, (req: express.Request, res: express.Response) => {
    res.json({ message: 'Admin access granted' });
});


export default router;
