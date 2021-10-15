import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
//import bcrypt from 'bcrypt';
import User from '../models/userSchema';
import { validateRegistration, validateLogin } from '../utils';
import verifyAccount from '../emailService/email';

export const passKey = process.env.PASSWORD_KEY as string;
export const tokenKey = process.env.TOKEN_KEY as string;
/**
 * Register new User
 */
export const registerUser = async (req: Request, res: Response) => {
    const { error } = validateRegistration(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    const password = req.body.password;
    //const hashedPassword = await bcrypt.hash(password, 10);
    const email = req.body.email;
    const encrypedPassword = CryptoJS.AES.encrypt(password, passKey).toString();

    try {
        const newUser = await User.create({
            username: req.body.username,
            email: email,
            password: encrypedPassword,
            isAdmin: req.body.isAdmin,
            isVerified: req.body.isVerified
        });

        const message = `
                    <form action="http://localhost:3000/api/users/verify/${email}" method="post">
                    <p>Thank you for signing up with our shopping App. Please click verify below to complete your sign up</p>
                    <br />
                    <button type="submit">VERIFY</button>
                    </form>
                    `;

        verifyAccount(email, message);
        return res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
};
/**
 * Login User
 */

export const userLogin = async (req: Request, res: Response) => {
    const username = req.body.username;
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).send('Invalid username or password');
        }
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            tokenKey,
            { expiresIn: '3d' }
        );
        const userPassword = user.password;
        const loginpassword = req.body.password;
        const decryptedPassword = CryptoJS.AES.decrypt(
            userPassword,
            passKey
        ).toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== loginpassword) {
            return res.status(404).send('Invalid username or password');
        }
        const { password, ...others } = user._doc;
        return res.status(200).send({ ...others, accessToken });
    } catch (error) {
        res.status(500).send(error);
    }
};
