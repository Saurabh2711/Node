var LocalStrategy   = require('passport-local').Strategy;
var  User=require('../modules/user');

module.exports=function(passport){
	passport.serializeUser(function(user,done){
		done(null,user);
	});
	passport.deserializeUser(function(user,done){
		done(null,user);
	});
	passport.use('local',new LocalStrategy({
		
		passReqToCallback:true
	},function(req,username,password,done) {
		console.log(req+" : "+username+" : "+password+" : "+done);
		process.nextTick(function() {
			console.log("LocalStrategy called");
			
			User.findOne({
				'email':username,
			},function(err,user){
				console.log(err+": :"+user);
				if(err){
					return done(err);
				}
				if(!user){
					return done(null,false,req.flash('message','Username not found'));
				}
				if(user.password!=password){
					return done(null,false,req.flash('message','wrong password'));
				}
				return done(null,user,req.flash('message',[user.email,user._id]));
			});
		});
	}));
};