const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
var keys = require("./keys");
const User = require('../database/schema');


passport.serializeUser((user,done)=>{
	done(null, user.id);
})

passport.deserializeUser((id,done)=>{
	User.findById(id).then((user)=>{
	done(null, user);	
	});
	
});


passport.use(
	new googleStrategy({
		//options for the google auth strategy
		callbackURL: '/auth/google/redirect',
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret
}, 
	(accessToken, refreshToken, profile, done) => {
		// passport callback function 
		//check if user already exists in database

		User.findOne({googleId: profile.id}).then( (currentUser)=>{
			if(currentUser){
				//user already exists but has updated his record in google
				if(currentUser.username!=profile.displayName || currentUser.photo!=profile.photos[0].value 
					|| currentUser.gender!=profile.gender)
				{
					if(currentUser.username!=profile.displayName)
						currentUser.username=profile.displayName;

					if(currentUser.photo!=profile.photos[0].value)
						currentUser.photo=profile.photos[0].value;

					if(currentUser.gender!=profile.gender)
						currentUser.gender=profile.gender;

				}

				//user exists but hasnt made any changes

				console.log("the already registered profile is:" + currentUser);
				console.log("the profile is: **************");
				console.log(profile);

				done(null, currentUser);
				
			}

			else{
				new User({
				username: profile.displayName,
				googleId: profile.id,
				email: profile.emails[0].value,
				photo: profile.photos[0].value,
				gender: profile.gender
				}).save().then((newUser)=> {
					console.log('new user created' + newUser);

					done(null, newUser);
					});

				}	
		});

		
	})

);