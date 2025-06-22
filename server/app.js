const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const indexRouter = require('./routes/indexRoute.js');
const usersRouter = require('./routes/userRoute.js');
const listsRouter = require('./routes/listRoute.js');
const todosRouter = require('./routes/todoRoute.js');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Tada API is running on port ${port}`);
});