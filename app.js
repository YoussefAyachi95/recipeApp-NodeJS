const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./server/routes/recipeRoutes.js')
require('dotenv').config()

const app = express();
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(expressLayouts)
app.use('/', routes)

app.set('view engine', 'ejs')
app.set('layout', './layouts/main')

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})


