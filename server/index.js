const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use( bodyParser.json() );
app.use(cors())

let characters = [
  {
    name: 'Zach Springer',
    strength: 5,
    intelligence: 5
  }
]


app.get('/api/person', (req, res) => {
  const random = Math.floor(Math.random() * characters.length)
  res.send(characters[random])
  
})

app.post('/api/person', (req, res) => {
  characters.push(req.body)
})

const port = 4000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
