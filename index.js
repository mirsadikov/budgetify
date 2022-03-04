import express from 'express';
import 'colors';
import dotenv from 'dotenv';

// routes
import accountRoute from './routes/accountRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import expenseRoute from './routes/expenseRoute.js';
import incomeRoute from './routes/incomeRoute.js';
import userRoute from './routes/userRoute.js';
import reportsRoute from './routes/reportsRoute.js';
import faqRoute from './routes/faqRoute.js';

// middlewares
import logger from './utils/logger.js';
import errorHandler from './middlewares/errorMiddleware.js';

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(logger);

// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/account', accountRoute);
app.use('/api/category', categoryRoute);
app.use('/api/expense', expenseRoute);
app.use('/api/income', incomeRoute);
app.use('/api/user', userRoute);
app.use('/api/reports', reportsRoute);
app.use('/api/faqs', faqRoute);

// error handler
app.use(errorHandler);

// listen
const { PORT } = process.env;
if (!PORT) {
  throw new Error('PORT is not set!'.red);
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`.blue.inverse);
});
