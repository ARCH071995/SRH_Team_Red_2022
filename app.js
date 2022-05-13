var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const exp = require('constants');
var neo4j = require('neo4j-driver');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j123', 'soorya'));
var session = driver.session();

app.get('/', function (req, res) {
    session
        .run('MATCH (p:Person)-[:INTERESTED_IN]->(h:hobby{HOBBY:"Dancing"}) RETURN p,h')
        .then(function (result) {
            var placeArr = [];
            result.records.forEach(function (record) {
                placeArr.push({
                    ID: record._fields[0].identity.low,
                    FIRSTNAME: record._fields[0].properties.FIRSTNAME,
                    LASTNAME: record._fields[0].properties.LASTNAME,
                    
                });
            });
            res.render('index', {
                places: placeArr
            });
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.listen(3000);
console.log('Server Started on Port 3000');

module.exports = app;