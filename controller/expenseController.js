export function createExpense(req, res) {
  // get info from req.body
  // get info from req.user
  // create expense in database
  res.send('createExpense called');
}

export function updateExpense(req, res) {
  // get id from req.params
  // get info from req.body
  // get info from req.user
  // update expense in database
  res.send('updateExpense called');
}

export function getExpense(req, res) {
  // get id from req.params
  // get info from req.user
  // get expense from database
  res.send('getExpense called');
}

export function getAllExpenses(req, res) {
  // get info from req.user
  // get all expenses from database
  res.send('getAllExpenses called');
}

export function deleteExpense(req, res) {
  // get id from req.params
  // get info from req.user
  // delete expense from database
  res.send('deleteExpense called');
}
