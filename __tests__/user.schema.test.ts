import User from '../src/models/userSchema';

describe('Test user schema', () => {
    test('username', () => {
        const username = User.schema.obj.username;
        expect(username).toEqual({
            type: String,
            required: true,
            unique: true,
            trim: true
        });
    });
    test('email', () => {
        const email = User.schema.obj.email;
        expect(email).toEqual({
            type: String,
            required: true,
            unique: true,
            trim: true
        });
    });
    test('password', () => {
        const password = User.schema.obj.password;
        expect(password).toEqual({
            type: String,
            required: true,
            trim: true
        });
    });
    test('isAdmin', () => {
        const isAdmin = User.schema.obj.isAdmin;
        expect(isAdmin).toEqual({
            type: Boolean,
            default: false
        });
    });
    test('isVerified', () => {
        const isVerified = User.schema.obj.isVerified;
        expect(isVerified).toEqual({
            type: Boolean,
            default: false
        });
    });
});
