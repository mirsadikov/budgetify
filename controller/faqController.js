import { faqs } from '../data/db.js';

export function createFaq(req, res) {
  // get info from req.body
  const { question, answer } = req.body;
  // create faq in database
  const newFaq = {
    id: faqs.length + 1,
    question,
    answer,
  };

  faqs.push(newFaq);

  res.json(newFaq);
}

export function updateFaq(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get info from req.body
  const { question, answer } = req.body;
  // update faq in database
  const faqIndex = faqs.findIndex((faq) => faq.id === +id);
  faqs[faqIndex].question = question;
  faqs[faqIndex].answer = answer;

  res.json(faqs[faqIndex]);
}

export function getFaq(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get faq from database
  const faq = faqs.find((f) => f.id === +id);
  res.json(faq);
}

export function getAllFaqs(req, res) {
  // get all faqs from database

  res.json(faqs);
}

export function deleteFaq(req, res) {
  // get id from req.params
  const { id } = req.params;
  // delete faq from database
  const faqIndex = faqs.findIndex((faq) => faq.id === +id);
  faqs.splice(faqIndex, 1);

  res.json({ message: 'FAQ deleted' });
}
