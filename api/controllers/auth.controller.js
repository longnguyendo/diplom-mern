import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async ( req, res) => {
    console.log(req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({message: 'all fields are required'})
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
    await newUser.save();
    res.json('signup successful');
}