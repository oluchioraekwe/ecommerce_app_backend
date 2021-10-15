import { Request, Response } from 'express';
import Product from '../models/productSchema';

/**
 * CREATE PRODUCT
 */

export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await Product.create(req.body);
        return res.status(200).send(newProduct);
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * UPDATE PRODUCT
 */

export const updateProduct = async (req: Request, res: Response) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).send(updatedProduct);
    } catch (error) {
        return res.status(500).send(error);
    }
};
/***
 * DELETE PRODUCT
 */

export const removeProduct = async (req: Request, res: Response) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res
            .status(200)
            .send(`Product with ${req.params.id} has been deleted`);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * GET ALL PRODUCTS
 */

export const getAllProducts = async (req: Request, res: Response) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    console.log(qCategory);
    let products = [];
    try {
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            });
        } else {
            products = await Product.find();
        }

        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * GET ONE PRODUCT
 */

export const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res
                .status(404)
                .send(`Product with id ${req.params.id} was not found`);
        }
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send(error);
    }
};
