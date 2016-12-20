const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Lion = require('../models/lions');

mongoose.connect('mongodb://dbuser:fvistudent@ds141078.mlab.com:41078/apidatabase');


//using morgan to log in the terminal, morgan comes first
app.use(morgan('dev'));
//middleware: middleware order is impotant!
// Accesing the index.html in the 'client folder'
app.use(express.static('client'));
// Parse url code
app.use(bodyParser.urlencoded({ extended: true }));
// Parse the data in json
app.use(bodyParser.json());

/////////////////////
// CRUD Operations //
/////////////////////

// Get lions
app.get('/lions', (req,res) => {
      Lion.find((err, lions) => {
        if (err) {
          res.send(err);
        }
        res.json(lions);
      })
})

//Get one lion by id
app.get('/lions/:id', (req,res) => {
      const lion = req.lion;
      Lion.findById(req.params.id, (err, lion) => {
        if (err) {
          res.send(err);
        }
        res.json(lion);
      });
});

// Create one lion
app.post('/lions', (req,res) => {
      // Recieve json lion objects
      let lion = req.body;
      console.log(lion);
      const lionObjects = new Lion({
        name : lion.name,
        age : lion.age,
        pride : lion.pride,
        gender : lion.gender
      });
      lionObjects.save((err) => {
        if(err) {
          res.send(err);
        }
        res.json({message: 'lion created'});
      });
});

// Update one lion by id
app.put('/lions/:id', (req, res) => {
    Lion.findById(req.params.id, (err, lion) => {
      if (err) {
        res.send();
      }
      if (req.body.name) {
        lion.name = req.body.name;
      }
      if (req.body.age) {
        lion.age = req.body.age;
      }
      if (req.body.pride) {
        lion.pride = req.body.pride;
      }
      if (req.body.gender) {
        lion.gender = req.body.gender;
      }
      // lion.name = req.body.name;
      // lion.age = req.body.age;
      // lion.pride = req.body.pride;
      // lion.gender = req.body.gender;

      lion.save((err) => {
        if(err) {
          res.send(err);
        }
        res.json({message: 'Updated the lion'})
      })
    });
});

// Delete one lion by id
app.delete('/lions/:id', (req, res) => {
      Lion.remove({_id: req.params.id}, (err,lion) => {
        if (err) {
          res.send(err);
        }
        res.json({message: 'Deleted the Lion!!'})
      });
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
