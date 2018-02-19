const router = require('express').Router();
const upload = require('../file/upload')

const authCheck = (req, res, next)=>{
	if(!req.user){
		//if user is not logged in 
		res.redirect('/');
	}
	else{
		//if logged in
		global.id = req.user.googleId;
		next();
	}
};

router.get('/', authCheck, (req, res)=>{
	
	res.render('profile', {user: req.user});

});

router.use('/upload',upload);



module.exports = router;