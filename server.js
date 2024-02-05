const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const items = require('./routes/api/items')

const app = express()

app.use(bodyParser.json())

const db = 'mongodb://127.0.0.1:27017/shopping-list'

mongoose
.connect(db)
.then(() => console.log('Mongodb connected...'))
.catch(error => console.log(error))

app.use('/api/items', items)

if( process.env.NODE_ENV === 'production' ) {

    app.use(express.static('client/build'))
    
    app.get('*', (req, res) => {
        res.sendFile(path, path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}

const port = process.env.PORT || 500;

app.listen(port, () => console.log(`Server is started on port ${port}`))