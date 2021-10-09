import Order from '../src/models/orderSchema';

describe('Test for Cart Schema', () => {
    test('userId', () => {
        const userId = Order.schema.obj.userId;
        expect(userId).toEqual({
            type: String,
            required: true
        });
    });
    test('productId', () => {
        const productId = Order.schema.obj.products[0].productId;
        expect(productId).toEqual({
            type: String
        });
    });
    test('quantity', () => {
        const quantity = Order.schema.obj.products[0].quantity;
        expect(quantity).toEqual({
            type: Number,
            default: 1
        });
    });
    test('amount', () => {
        const amount = Order.schema.obj.amount;
        expect(amount).toEqual({
            type: Number,
            required: true
        });
    });
    test('address', () => {
        const address = Order.schema.obj.address;
        expect(address).toEqual({
            type: Object,
            required: true
        });
    });
    test('status', () => {
        const status = Order.schema.obj.status;
        expect(status).toEqual({
            type: String,
            default: 'pending',
            enum: ['pending', 'delivered', 'not-delivered']
        });
    });
});
