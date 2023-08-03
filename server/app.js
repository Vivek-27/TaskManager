const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const cors = require('cors');
const { MONGO_URI } = require('./keys');
const bodyParser = require('body-parser');

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('connected to mongo');
});
mongoose.connection.on('error', (err) => {
  console.log('err connecting', err);
});

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./models/user');
require('./models/task');

app.use(require('./routes/auth'));
app.use(require('./routes/task'));

app.listen(PORT, () => {
  console.log('Server is Running on port ' + PORT);
});
