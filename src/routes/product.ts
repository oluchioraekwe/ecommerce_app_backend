import { Router } from 'express';
import {
    createProduct,
    updateProduct,
    removeProduct,
    getAllProducts,
    getSingleProduct
} from '../controllers/productController';
import {
    verifyToken,
    verifyAndAuthorizeUser,
    verifyTokenAndAdmin
} from '../middleware/verifyToken';

const router = Router();

router.post('/create', verifyToken, verifyTokenAndAdmin, createProduct);
router.put('/update/:id', verifyToken, verifyTokenAndAdmin, updateProduct);
router.delete('/delete/:id', verifyToken, verifyTokenAndAdmin, removeProduct);
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);

export default router;
