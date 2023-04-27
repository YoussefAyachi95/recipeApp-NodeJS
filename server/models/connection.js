const mongoose = require('mongoose');
require('dotenv').config()

const MONGODB = `${process.env.MONGODB_URL}/${process.env.MONGODB_COLLECTION}`

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=> console.log('Connected'))

// Models

require('./Category')
require('./Recipe')
