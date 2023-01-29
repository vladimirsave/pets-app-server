const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();
const petsRoute = require('./routes/petsRoute');
const usersRoute = require('./routes/usersRoute');
const dbConnection = require('./knex/knex');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000', 'https://pets-app-client.vercel.app'], credentials: true }));

app.use('/', petsRoute);
app.use('/users', usersRoute);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Oops page not found' });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err.message);
});


dbConnection.migrate.latest().then((migration) => {
  if (migration) {
    console.log('Connected to DB', migration);
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  }
});
