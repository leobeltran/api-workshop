const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const morgan = require('morgan');

let lions = [];
let id = 0;

const updateId = (req, res, next) => {
  if(!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

//using morgan to log in the terminal, morgan comes first
app.use(morgan('dev'));
//middleware: middleware order is impotant!
// Accesing the index.html in the 'client folder'
app.use(express.static('client'));
// Parse url code
app.use(bodyParser.urlencoded({ extended: true }));
// Parse the data in json
app.use(bodyParser.json());

app.param('id', (req, res, next, id) => {
  const lion = _.find(lions, {id:id});

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

/////////////////////
// CRUD Operations //
/////////////////////

// Get lions
app.get('/lions', (req,res) => {
      res.json(lions);
})

// Get one lion by id
app.get('/lions/:id', (req,res) => {
      const lion = req.lion;
      res.json(lion || {});
});

// Create one lion
app.post('/lions', updateId, (req,res) => {
      // Recieve json lion objects
      let lion = req.body;

      lions.push(lion);

      // returning the sent object to the sender
      res.json(lion);
});

// Update one lion by id
app.put('/lions/:id', (req, res) => {
      // Receive data
      let update = req.body;
      if (update.id) { delete update.id }
      // find the lion
      let lion = _.findIndex(lions, {id: req.params.id});
      if (!lions[lion]){
            res.send();
      } else {
            const updateLion = _.assign(lions[lion], update);
            res.json(updateLion);
      }

});

// Delete one lion by id
app.delete('/lions/:id', (req, res) => {
      const lion = _.findIndex(lions, {id: req.params.id});
      if (!lions[lion]) {
            res.end();
      } else {
            const deletedLion = lions[lion];
            lions.splice(lion, 1);
            res.json(deletedLion);
      }
});

// Error catcher. this is placed last to catch err
app.use((err, req, res, next) =>{
  if (err) {
    res.status(500).send(err);
  }
});

const PORT = 3000;


app.listen(PORT, () => {
  console.log('listening on http://localhost:', PORT);
});
