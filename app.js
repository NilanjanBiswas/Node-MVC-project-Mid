var express 	= require('express');
var exSession 	= require('express-session');
var bodyParser 	= require('body-parser');
var login 		= require('./controller/login');
var home 		= require('./controller/home');
var logout 		= require('./controller/logout');
var user		= require('./controller/userController');
var tutor       =require('./controller/tutor');
var student       =require('./controller/student');
var app 		= express();

//config
app.set('view engine', 'ejs');

app.use('/abc', express.static('assets'));
//app.use('/abc/img', express.static('assets'));


//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false}));
app.use('/user', user);
app.use ('/tutor',tutor);
app.use ('/student',student);
app.use('/login', login);
app.use('/logout', logout);
app.use('/home', home);
//app.use('/user_registration',user_registration);

/*app.get('/admin/user/:abc/:name', function(req, res){
	res.send(req.params.abc+" | "+req.params.name);
});*/

// app.get('/', function(req, res){
//
// 		res.render('/index');
//
// });
app.get('/', (req, res)=>{
	res.render('index');

});

app.listen(3000, function(){
	console.log('express http server started at...3000');
});
