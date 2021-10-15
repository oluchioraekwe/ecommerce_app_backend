import { Router } from 'express';
import {
    createCart,
    updateCart,
    removeCart,
    getUserCart,
    getAllCart
} from '../controllers/cartController';
import {
    verifyToken,
    verifyAndAuthorizeUser,
    verifyTokenAndAdmin
} from '../middleware/verifyToken';

const router = Router();

router.post('/create', verifyToken, verifyAndAuthorizeUser, createCart);
router.put('/update/:id', verifyToken, verifyAndAuthorizeUser, updateCart);
router.delete('/delete/:id', verifyToken, verifyAndAuthorizeUser, removeCart);
router.get('/:userId', verifyToken, verifyAndAuthorizeUser, getUserCart);
router.get('/', verifyToken, verifyTokenAndAdmin, getAllCart);

export default router;
