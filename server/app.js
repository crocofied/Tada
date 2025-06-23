const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));
app.use(express.json());

const indexRouter = require('./routes/indexRoute.js');
const usersRouter = require('./routes/userRoute.js');
const listsRouter = require('./routes/listRoute.js');
const todosRouter = require('./routes/todoRoute.js');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/todos', todosRouter);

app.listen(3000, () => {
  console.log(`Tada API is running`);
});