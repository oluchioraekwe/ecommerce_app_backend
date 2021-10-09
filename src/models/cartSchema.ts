import mongoose from 'mongoose';

export interface cart_obj {
    [name: string]: string | number;
}
export interface ICart {
    userId: string;
    products: cart_obj[];
}

const cartSchema = new mongoose.Schema<ICart>(
    {
        userId: {
            type: String,
            required: true
        },
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    {
        timestamps: true
    }
);
const Cart = mongoose.model('cart', cartSchema);
export default Cart;
