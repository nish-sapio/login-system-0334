const router = require('express').Router();
const passport = require('passport');

//auth with google
router.get("/google", passport.authenticate('google',{
	scope: ['email','profile']
	}
	));


//auth logout
router.get("/logout", (req,res) =>{
	req.logout();
	res.redirect('/');
})


// redirect url
router.get('/google/redirect', passport.authenticate('google'), (req,res) =>{
	res.redirect('/profile/');
	});


module.exports = router;