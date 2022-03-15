import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as db from '../data/db.js';

export function registerUser(req, res) {
  const { email, password, role } = req.body;
  const userExists = db.getUserByEmail(email);

  if (userExists) {
    // if user exists, send error message
    res.status(400);
    throw new Error('User already exists!');
  }

  const id = db.registerUser({ email, role, password });
  const payload = { id, email, role };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    id,
    email,
    role,
    token: `Bearer ${token}`,
  });
}

export function loginUser(req, res) {
  // get info from database
  const { email, password } = req.body;
  const user = db.getUserByEmail(email);

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        token: `Bearer ${token}`,
      });
    } else {
      res.status(401);
      throw new Error('Incorrect email or password!');
    }
  } else {
    // if no user, send error message
    res.status(401);
    throw new Error('User not found!');
  }
}

// if needed
export function logOutUser(req, res) {
  // clear cookie token
  res.send('logOutUser called');
}
