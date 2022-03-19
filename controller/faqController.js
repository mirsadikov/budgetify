import FAQ from '../models/FAQ.js';

export async function createFaq(req, res, next) {
  try {
    const { question, answer } = req.body;
    const faq = await FAQ.create({ question, answer });
    res.json(faq);
  } catch (error) {
    next(error);
  }
}

export async function updateFaq(req, res, next) {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const faq = await FAQ.findOne({ _id: id });

    if (faq) {
      const udtFaq = await FAQ.findByIdAndUpdate(
        id,
        { question, answer },
        { new: true },
      );
      res.status(200).json(udtFaq);
    } else {
      res.status(404);
      throw new Error('FAQ not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function getFaq(req, res, next) {
  try {
    const { id } = req.params;
    const faq = await FAQ.findOne({ _id: id });
    if (faq) {
      res.json(faq);
    } else {
      res.status(404);
      throw new Error('FAQ not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllFaqs(req, res, next) {
  try {
    const faqs = await FAQ.find({});
    res.json(faqs);
  } catch (error) {
    next(error);
  }
}

export async function deleteFaq(req, res, next) {
  try {
    const { id } = req.params;
    const faq = await FAQ.findOne({ _id: id });
    if (faq) {
      await faq.remove();
      res.status(200).json({ success: true });
    } else {
      res.status(404);
      throw new Error('FAQ not found!');
    }
  } catch (error) {
    next(error);
  }
}
