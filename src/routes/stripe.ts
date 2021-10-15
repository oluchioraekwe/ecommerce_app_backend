import { Router, Request, Response } from 'express';
//import stripe from 'stripe';
const stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const router = Router();

router.post('/payment', (req: Request, res: Response) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: 'usd'
        },
        (stripeErr: any, stripeRes: any) => {
            if (stripeErr) {
                console.log(stripeErr);
                res.status(500).send(stripeErr);
            } else {
                res.status(200).send(stripeRes);
                console.log(stripeRes);
            }
        }
    );
});
export default router;
