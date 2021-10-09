import mongoose from 'mongoose';

export interface IProduct {
    title: string;
    description: string;
    img: string;
    categories: string[];
    size: string;
    color: string;
    price: number;
}

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        categories: {
            type: Array
        },
        size: {
            type: String
        },
        color: {
            type: String
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('product', productSchema);
export default Product;
