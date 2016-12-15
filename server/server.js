const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

//middleware: middleware order is impotant!
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extrended: true }));
app.use(bodyParser.json());

// const jsonData = {count: 12, message: 'hey'};

const PORT = 3000;


app.listen(PORT, () => {
  console.log('listening on http://localhost:', PORT);
});
