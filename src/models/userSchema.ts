import mongoose from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isVerified: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);
const User = mongoose.model('user', userSchema);
export default User;
