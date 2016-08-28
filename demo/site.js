'use strict';

const _ = require('lodash');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const sass = require('express-compile-sass');

const DEFAULT_HTTP_PORT = 8989;

// Register the Handlebars helpers
require('../src/templates/handlebars/hbs-helpers');

const app = express();
app.use(sass({
    'root': __dirname,
    'sourceMap': false,
    'sourceComments': false
}));
app.use(
    '/bower',
    express.static(path.join(__dirname, '../src/bower'))
);
app.use(
    '/assets/scss',
    express.static(path.join(__dirname, '../src/scss'))
);
app.use(
    '/assets/js',
    express.static(path.join(__dirname, '../src/js'))
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../src/templates/handlebars/pages'));
hbs.registerPartials(path.join(__dirname, '../src/templates/handlebars/partials'));

app.listen(DEFAULT_HTTP_PORT, () => {
    console.log('web server started!');
});
