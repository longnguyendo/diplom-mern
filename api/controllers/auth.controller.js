import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    console.log(req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcrypt.hashSync(password, 15);
    // in es6 key familiar value => we use the same word
    // no need to assign 
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })
    // try catch here
    try {
        await newUser.save();
        res.json('sign up successful');
    }
    catch (err) {
        next(err);
    }
}