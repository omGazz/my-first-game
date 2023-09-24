const express = require('express')
const path = require('path')
const app = express()

app.use(express.static("."))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

console.log(`App listening on 3000`)
app.listen(3000)