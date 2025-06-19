const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.js');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Tada API is running on port ${port}`);
});