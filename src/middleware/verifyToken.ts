import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { tokenKey } from '../controllers/authController';

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    console.log('authheader', typeof authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, tokenKey);
        console.log('decoded user', decoded);
        req.user = decoded;
        next();
    } else {
        return res.status(401).send('Not authenticated');
    }
};

export const verifyAndAuthorizeUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
    } else {
        res.status(403).json('You are not allowed to do that');
    }
};
export const verifyTokenAndAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(403).json('You are not authorized');
    }
};
