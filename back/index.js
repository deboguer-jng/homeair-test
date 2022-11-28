const express = require('express')
const fileUpload = require('express-fileupload')
const validateMiddleware = require('./middleware')
const upload = require('./controller')
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', validateMiddleware, upload);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})