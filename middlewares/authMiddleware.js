import passport from 'passport';
import User from '../models/User.js';

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

const admin = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user && user.role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

export { auth, admin };
