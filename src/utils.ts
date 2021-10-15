import Joi from 'joi';
interface user_obj {
    [name: string]: string | number | boolean;
}

export const validateRegistration = (user: user_obj) => {
    const schema = {
        username: Joi.string().required().min(4).max(50).trim(),
        email: Joi.string().required().min(10).max(254).trim(),
        password: Joi.string().required().min(6).max(100).trim(),
        isAdmin: Joi.boolean().optional(),
        isVerified: Joi.boolean().optional()
    };
    return Joi.validate(user, schema);
};

export const validateLogin = (user: user_obj) => {
    const schema = {
        username: Joi.string().required().min(4).max(50).trim(),
        password: Joi.string().required().min(6).max(100).trim()
    };
    return Joi.validate(user, schema);
};
