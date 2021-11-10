const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const vehicleRoute = require('./routes/vehicle.route');
const apiErrorHandler = require('./error/api-error-handler');

require('dotenv').config();

const app = express();

app.use(bodyParser.json())

app.use(cors());
app.use(cookieParser());
app.use('/vehicles', vehicleRoute);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build'))
    });
}



app.use(apiErrorHandler);

module.exports = app;
