import Cart from '../src/models/cartSchema';

describe('Test for Cart Schema', () => {
    test('userId', () => {
        const userId = Cart.schema.obj.userId;
        expect(userId).toEqual({
            type: String,
            required: true
        });
    });
    test('productId', () => {
        const productId = Cart.schema.obj.products[0].productId;
        expect(productId).toEqual({
            type: String
        });
    });
    test('quantity', () => {
        const quantity = Cart.schema.obj.products[0].quantity;
        expect(quantity).toEqual({
            type: Number,
            default: 1
        });
    });
});
