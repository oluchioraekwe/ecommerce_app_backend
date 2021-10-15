import mongoose from 'mongoose';
import { cart_obj } from './cartSchema';

export interface IOrder {
    userId: string;
    products: cart_obj[];
    amount: number;
    address: cart_obj;
    status: string;
}

const orderSchema = new mongoose.Schema<IOrder>(
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
        ],
        amount: {
            type: Number,
            required: true
        },
        address: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'delivered', 'not-delivered']
        }
    },
    {
        timestamps: true
    }
);
const Order = mongoose.model('order', orderSchema);
export default Order;
