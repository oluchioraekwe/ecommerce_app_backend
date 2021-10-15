import Product from '../src/models/productSchema';

describe('Test for product schema', () => {
    test('title', () => {
        const title = Product.schema.obj.title;
        expect(title).toEqual({
            type: String,
            required: true,
            unique: true,
            trim: true
        });
    });
    test('description', () => {
        const description = Product.schema.obj.description;
        expect(description).toEqual({
            type: String,
            required: true
        });
    });
    test('img', () => {
        const img = Product.schema.obj.img;
        expect(img).toEqual({
            type: String,
            required: true
        });
    });
    test('categories', () => {
        const categories = Product.schema.obj.categories;
        expect(categories).toEqual({
            type: Array
        });
    });
    test('size', () => {
        const size = Product.schema.obj.size;
        expect(size).toEqual({
            type: String
        });
    });
    test('color', () => {
        const color = Product.schema.obj.size;
        expect(color).toEqual({
            type: String
        });
    });
    test('price', () => {
        const price = Product.schema.obj.price;
        expect(price).toEqual({
            type: Number,
            required: true
        });
    });
});
