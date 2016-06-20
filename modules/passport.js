var LocalStrategy   = require('passport-local').Strategy;
var  User=require('../modules/user');

module.exports=function(passport){
	passport.serializeUser(function(user,done){
		done(null,user);
	});
	passport.deserializeUser(function(user,done){
		done(null,user);
	});
	passport.use(new LocalStrategy(function(username,password,done) {
		process.nextTick(function() {
			console.log("LocalStrategy called");
			console.log(username+" : "+password+" : "+done);
			User.findOne({
				'email':username,
			},function(err,user){
				console.log(err+": :"+user);
				if(err){
					return done(err);
				}
				if(!user){
					return done(null,false,{message:'username not found'});
				}
				if(user.password!=password){
					return done(null,false,{message:'wrong password'});
				}
				return done(null,user);
			});
		});
	}));
};