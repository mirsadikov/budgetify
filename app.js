import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
// routes
import accountRoute from './routes/accountRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import userRoute from './routes/userRoute.js';
import reportsRoute from './routes/reportsRoute.js';
import faqRoute from './routes/faqRoute.js';
// config
import './config/env.js';
import { jwtCallback, jwtOptions } from './config/passport.js';
// middlewares
import logger from './utils/logger.js';
import errorHandler from './middlewares/errorMiddleware.js';
import notFound from './middlewares/notFoundMiddleware.js';

// config
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(logger);
passport.use(new JwtStrategy(jwtOptions, jwtCallback));

// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/account', accountRoute);
app.use('/api/category', categoryRoute);
app.use('/api/transaction', transactionRoute);
app.use('/api/user', userRoute);
app.use('/api/reports', reportsRoute);
app.use('/api/faqs', faqRoute);

// error handler
app.use(notFound);
app.use(errorHandler);

export default app;
