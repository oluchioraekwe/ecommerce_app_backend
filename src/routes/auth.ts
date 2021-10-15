import { Router } from 'express';
import { registerUser, userLogin } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', userLogin);

export default router;
