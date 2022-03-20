import { ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

export const jwtCallback = async (jwtPayLoad, done) => {
  try {
    const user = await User.findById(jwtPayLoad.id).select('-password');
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
