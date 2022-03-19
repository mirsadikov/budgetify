import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Account',
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense'],
    },
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      validate: {
        validator: (v) => v < Date.now(),
        message: () => `Date must be less than current date`,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Transaction', transactionSchema);
