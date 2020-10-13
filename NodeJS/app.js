var express       = require('express');
var mongoose      = require('mongoose');
var passport      = require('passport');
var http          = require('http');
var path          = require('path');
var engine        = require('ejs-locals');
var bodyParser    = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var DB_URI        = '';
// var DB_URI      = 'mongodb://localhost:27017/testdb';
// const DB_URI      = "mongodb+srv://dbUser:P@ssw0rd@cluster0-tycp2.mongodb.net/test?retryWrites=true&w=majority"

if (require.main === module) {
  DB_URI = "mongodb+srv://dbUser:P@ssw0rd@cluster0-tycp2.mongodb.net/tdl?retryWrites=true&w=majority"
}
else{
  DB_URI = "mongodb+srv://dbUser:P@ssw0rd@cluster0-tycp2.mongodb.net/test?retryWrites=true&w=majority"
}
let options       = { useNewUrlParser: true  };
mongoose.connect(DB_URI, options);

var app           = express();
var cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use(passport.session());
const User = require('./Models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 // Enable routing and use port 1337.
require('./router')(app);
app.set('port', 1337);

 // Set up ejs templating.
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Set view folder.
app.set('views', path.join(__dirname, 'views'));

// That line is to specify a directory where you could 
// link to static files (images, CSS, etc.). 
// So if you put a style.css file in that directory and you 
// could link directly to it in your view <link href=”style.css” rel=”stylesheet”>
app.use(express.static(path.join(__dirname, 'static')));
 
http.createServer(app).listen(process.env.PORT || 4000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;