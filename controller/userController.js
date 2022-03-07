import { users } from '../data/db.js';

export function authUser(req, res) {
  // get info from database
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (user) {
    // compare info with req.body
    if (user.password !== password) {
      res.status(401);
      throw new Error('Wrong or invalid password!');
    } else {
      // if match, send token
      res.send({ token: 'fake-token' });
    }
  } else {
    // if not, send error message
    res.status(401);
    throw new Error('User not found!');
  }
}

// if needed
export function logOutUser(req, res) {
  // clear cookie token
  res.send('logOutUser called');
}
