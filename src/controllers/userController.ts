import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import User from '../models/userSchema';
import { passKey } from './authController';

/**
 * updateuser
 */
export const updateUser = async (req: Request, res: Response) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            passKey
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).send(updatedUser);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * verifyuser
 */
export const verifyUser = async (req: Request, res: Response) => {
    const email = req.params.id;
    const verifiedUser = await User.findOneAndUpdate(
        { email: email },
        { isVerified: true },
        { new: true, useFindAndModify: false }
    );
    res.status(200).send(verifiedUser);
};
/**
 * deleteeuser
 */
export const removeUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send(`User with ID ${req.params.id} has been deleted`);
    } catch (error) {
        res.status(500).send(error);
    }
};
/**
 * get a user
 */
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).send(others);
    } catch (error) {
        res.status(500).send(error);
    }
};
/**
 * get all users
 */
export const getAllUser = async (req: Request, res: Response) => {
    const query = req.query.new;
    let users = [];
    try {
        if (query) {
            users = await User.find().sort({ _id: -1 }).limit(5);
        } else {
            users = await User.find();
        }

        return res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * user statistics
 */

export const userStatistics = async (req: Request, res: Response) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' }
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};
