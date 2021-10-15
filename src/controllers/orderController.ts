import { Request, Response } from 'express';
import Order from '../models/orderSchema';

/**
 * CREATE ORDER
 */

export const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder = await Order.create(req.body);
        return res.status(201).send(newOrder);
    } catch (error) {
        return res.status(500).send(error);
    }
};
/**
 * UPDATE ORDER
 */

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).send(updatedOrder);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * DELETE ORDER
 */
export const removeOrder = async (req: Request, res: Response) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).send('Order successfully deleted');
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * GET USER ORDERS
 */
export const getUserOrder = async (req: Request, res: Response) => {
    try {
        const userOrder = await Order.find({ userId: req.params.userId });
        return res.status(200).send(userOrder);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * GET ALL ORDERS
 */
export const getAllOrder = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * GET MONTHLY INCOME
 */

export const monthlyIncome = async (req: Request, res: Response) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const lastTwoMonths = new Date(
        new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: lastTwoMonths } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount'
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' }
                }
            }
        ]);
        res.status(200).send(income);
    } catch (error) {
        return res.status(500).send(error);
    }
};
