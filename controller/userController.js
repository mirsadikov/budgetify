import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export async function registerUser(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error('Invalid input!');
    }

    const userExists = await User.findByEmail(email);

    if (userExists) {
      res.status(400);
      throw new Error('User already exists!');
    }

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
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
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Invalid input!');
    }

    const user = await User.findByEmail(email);

    if (user) {
      if (await user.matchPassword(password)) {
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
      res.status(404);
      throw new Error('User not found!');
    }
  } catch (error) {
    next(error);
  }
}
