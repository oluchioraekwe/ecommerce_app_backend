import { Router } from 'express';
import {
    verifyToken,
    verifyAndAuthorizeUser,
    verifyTokenAndAdmin
} from '../middleware/verifyToken';
import {
    updateUser,
    verifyUser,
    removeUser,
    getUser,
    getAllUser,
    userStatistics
} from '../controllers/userController';
const router = Router();

/* users route */

router.get('/', verifyToken, verifyTokenAndAdmin, getAllUser);
router.get('/stats', verifyToken, verifyTokenAndAdmin, userStatistics);
router.get('/:id', verifyToken, verifyTokenAndAdmin, getUser);
router.put('/update/:id', verifyToken, verifyAndAuthorizeUser, updateUser);
router.post('/verify/:id', verifyUser);
router.delete('/delete/:id', verifyToken, verifyAndAuthorizeUser, removeUser);
export default router;
