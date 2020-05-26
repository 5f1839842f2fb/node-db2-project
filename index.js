const express = require("express")
const db = require("./data/db")

const server = express();
server.use(express.json())

const validateId = (req, res, next) => {
  db('cars').where({ id: req.params.id})
  .then(response => {
    if (response.length !== 0) {
      next()
    } else {
      res.status(400).json({ message: "invalid id" })
    }
  })
}

const validateNewCar = (req, res, next) => {
  if (!("VIN" in req.body) 
  || !("make" in req.body) 
  || !("model" in req.body) 
  || !("mileage" in req.body)) {
    res.status(400).json({ message: "missing required field(s)"})
  } else {
    next()
  }
}

server.use('/:id', validateId)
server.post('/', validateNewCar)

server.get('/', (req, res) => {
  db('cars').then(response => res.status(200).send(response))
})

server.get('/:id', (req, res) => {
  db('cars').where({ id: req.params.id }).then(response => res.status(200).send(response))
})

server.post('/', (req, res) => {
  db('cars').insert(req.body).then(response => res.status(200).send(response))
  .catch(error => res.status(400).send(error))
})

server.listen(3000, () => {
  console.log(`listening on 3000`);
});
