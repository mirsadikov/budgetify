import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export async function registerUser(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      // if user exists, send error message
      res.status(400);
      throw new Error('User already exists!');
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const payload = { id: user._id, email: user.email, role: user.role };

    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: `Bearer ${generateToken(payload)}`,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    // get info from database
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      if (user.matchPassword(password, user.password)) {
        const payload = { id: user.id, email: user.email, role: user.role };

        res.status(200).json({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          token: `Bearer ${generateToken(payload)}`,
        });
      } else {
        res.status(401);
        throw new Error('Incorrect email or password!');
      }
    } else {
      // if no user, send error message
      res.status(404);
      throw new Error('User not found!');
    }
  } catch (error) {
    next(error);
  }
}

// if needed
export function logOutUser(req, res) {
  // clear cookie token
  res.send('logOutUser called');
}
