var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = 9000;
var index = require('./routes/index');
var tasks = require('./routes/tasks');
var cors = require('cors');
var hbs = require('express-handlebars');
var app = express();

//views engine
app.use(cors({}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'client')));

//body parser Middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',index);
// app.use('/api', tasks);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });
  app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
  app.set('views', path.join(__dirname, '/views')); //set path in which file is present
  app.set('view engine', 'hbs');
app.listen(port, function(){
    console.log(" server started on port " + port);
});