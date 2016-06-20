var express = require('express');
var router = express.Router();
var flash    = require('connect-flash');
var passport=require('passport');
var mongoose=require('mongoose');
var session=require('express-session');
mongoose.connect('mongodb://127.0.0.1:27017/loginapp');

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
/*
router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());
*/
router.use(session({
    secret: 'secret cat',
    resave: true,
    saveUninitialized: true
}));


require('../modules/passport')(passport);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});
router.get('/login', function(req, res, next) {
  console.log("Hello: ");
  res.render('login', { message: req.flash('message') });
  
});
router.get('/signup', function(req, res, next) {

  res.render('signup', { message:req.flash('message')});

});
router.get('/profile', function(req, res, next) {
  var x=req.flash('message');
  res.render('profile', {email:x[0],id:x[1]});
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash:true
  })
);

router.get('/logout',function(req,res,next){
	req.logout();
	res.redirect('/');
});
module.exports = router;
