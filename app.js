const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys.js')
const cookieSession = require('cookie-session');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');
const multer = require('multer');
const path = require('path');
const upload= require('./file/upload.js');

var port = 3000 || process.env.PORT;
var url = 'mongodb://localhost/user';

const app = express();

//set up view engine(jade templating engine)
app.set("view engine", "jade");

//manage the sessions on the website
app.use(cookieSession({
	maxAge: 12*60*60*1000, //in milliseconds
	keys: [keys.session.cookieKey] 
}));


app.use(express.static(path.join(__dirname, 'login_v5')));
//app.use(express.static(path.join(__dirname, 'data')));

//initialize passport before the sessions
app.use(passport.initialize());
app.use(passport.session());


//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//connect to the database
mongoose.connect(url);

mongoose.connection.once('open', () => {
	console.log("connection to database successful!");
}

	).on('error', (error) =>{
		console.log("connection error:");
	});

//path to the home page
app.get("/", (req, res) => {
	res.render('home');
});


//listen to the port
app.listen(port, () =>{
	console.log("app running on the 3000 port. :D");
});