import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const test = (req, res) => {
    res.json({message: 'API is working'})
} 

export const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'Not allowed to update this user'));
    }
    if (req.body.password) {
        if (req.body.password.length<6) {
            return next(errorHandler(400, 'pass must be at least 6 characters'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400,'user be between 7 and 20'))
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400,'username cannot contain spaces'))
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400,'username cannot uppercase'))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400,'username can only contain letters and numbers'))
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            }, 
        },
        {new : true }
    );
    const { password, ...rest} = updatedUser._doc;
    res.status(200).json(rest);

    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {

    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'Not allowed to update this user'));
    }

    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('user has been delete');
    } catch (err) {
        next(err);
    }
}

export const signoutUser = async (req, res, next) => {

    try {
        res.clearCookie('access_token').status(200).json('User has been signout')
    } catch (err) {
        next(err);
    }
}

  // if u can code get posts u can code get users here;
export const getUsers = async (req, res, next) => {

  try {
    const user = parseInt(req.query.user) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const skip = user * limit;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(skip)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
}
// get every user for admin
export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return next(errorHandler(404, 'User not found'));
      }
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
      
    } catch (error) {
      next(error);
    }
};