const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

//middleware: middleware order is impotant!
// Accesing the index.html in the 'client folder'
app.use(express.static('client'));
// Parse url code
app.use(bodyParser.urlencoded({ extrended: true }));
// Parse the data in json
app.use(bodyParser.json());

let lions = [];
let id = 0;

/////////////////////
// CRUD Operations //
/////////////////////

// Get lions
app.get('/lions', (req,res) => {
      res.json(lions);
})

// Get one lion by id
app.get('/lions/:id', (req,res) => {
      const lion = _.find(lions,{id:req.params.id});
      res.json(lion || {});
})

// Create one lion
app.post('/lions', (req,res) => {
      // Recieve json lion objects
      let lion = req.body;

      //adding id (string) and pushing storage (array)
      id++;
      lion.id = id + '';
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


const PORT = 3000;


app.listen(PORT, () => {
  console.log('listening on http://localhost:', PORT);
});
