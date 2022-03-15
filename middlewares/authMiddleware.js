import passport from 'passport';
import * as db from '../data/db.js';

const auth = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    return next();
  })(req, res, next);

const admin = (req, res, next) => {
  const user = db.getUserByEmail(req.user.email);

  if (user && user.role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

export { auth, admin };
