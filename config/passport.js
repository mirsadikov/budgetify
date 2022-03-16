import { ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

export const jwtCallback = async (jwtPayLoad, done) => {
  const user = await User.findById(jwtPayLoad.id);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
