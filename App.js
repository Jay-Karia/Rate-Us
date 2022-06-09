const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const router = require('./Routes/routes')

const app = express();
const port = 8000;

var exphbs = require('express-handlebars');

var hbs = exphbs.create({ /* config */ });

const db_uri = 'mongodb+srv://Jay:09Jan1973@cluster0.s0b7o1p.mongodb.net/my-db?retryWrites=true&w=majority'
mongoose.connect(db_uri)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/', router)


app.listen(port, () => console.log(`App listening on port ${port}`))