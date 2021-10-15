import { Request, Response } from 'express';
import Cart from '../models/cartSchema';

/**
 * CREATE CART
 */

export const createCart = async (req: Request, res: Response) => {
    try {
        const newCart = await Cart.create(req.body);
        return res.status(201).send(newCart);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * UPDATE CART
 */

export const updateCart = async (req: Request, res: Response) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).send(updatedCart);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * DELETE CART
 */
export const removeCart = async (req: Request, res: Response) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).send(`Cart has been deleted`);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * GET USER CART
 */

export const getUserCart = async (req: Request, res: Response) => {
    try {
        const userCart = await Cart.findOne({ userId: req.params.userId });
        return res.status(200).send(userCart);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * GET ALL CARTS
 */

export const getAllCart = async (req: Request, res: Response) => {
    try {
        const carts = await Cart.find();
        return res.status(200).send(carts);
    } catch (error) {
        return res.status(500).send(error);
    }
};
