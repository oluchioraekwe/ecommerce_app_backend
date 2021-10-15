import { Router } from 'express';
import {
    createOrder,
    updateOrder,
    removeOrder,
    getUserOrder,
    getAllOrder,
    monthlyIncome
} from '../controllers/orderController';
import {
    verifyAndAuthorizeUser,
    verifyToken,
    verifyTokenAndAdmin
} from '../middleware/verifyToken';

const router = Router();

router.post('/create', verifyToken, verifyAndAuthorizeUser, createOrder);
router.put('/update/:id', verifyToken, verifyTokenAndAdmin, updateOrder);
router.delete('/delete/:id', verifyToken, verifyTokenAndAdmin, removeOrder);
router.get('/:userId', verifyToken, verifyAndAuthorizeUser, getUserOrder);
router.get('/', verifyToken, verifyTokenAndAdmin, getAllOrder);
router.get('/income', verifyToken, verifyTokenAndAdmin, monthlyIncome);
export default router;
