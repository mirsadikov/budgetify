import Category from '../models/Category.js';

export async function createCategory(req, res, next) {
  try {
    const { title } = req.body;
    const { id: userId } = req.user;

    const category = await Category.create({ userId, title });
    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const { id: userId } = req.user;

    const category = await Category.findOne({ _id: id, userId });

    if (category) {
      const udtCat = await Category.findByIdAndUpdate(
        id,
        { title },
        { new: true },
      );
      res.status(200).json(udtCat);
    } else {
      res.status(404);
      throw new Error('Category not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function getCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const category = await Category.findOne({ _id: id, userId });

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllCategories(req, res, next) {
  try {
    const { id: userId } = req.user;
    const categories = await Category.find({ userId });

    res.json(categories);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const category = await Category.findOne({ _id: id, userId });

    if (category) {
      await category.remove();
      res.status(200).json({ success: true });
    } else {
      res.status(404);
      throw new Error('Category not found!');
    }
  } catch (error) {
    next(error);
  }
}
