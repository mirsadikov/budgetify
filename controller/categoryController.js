export function createCategory(req, res) {
  // get info from req.body
  // get info from req.user
  // create category in database
  res.send('createCategory called');
}

export function updateCategory(req, res) {
  // get id from req.params
  // get info from req.body
  // get info from req.user
  // update category in database
  res.send('updateCategory called');
}

export function getCategory(req, res) {
  // get id from req.params
  // get info from req.user
  // get category from database
  res.send('getCategory called');
}

export function getAllCategories(req, res) {
  // get info from req.user
  // get all categories from database
  res.send('getAllCategories called');
}

export function deleteCategory(req, res) {
  // get id from req.params
  // get info from req.user
  // delete category from database
  res.send('deleteCategory called');
}
