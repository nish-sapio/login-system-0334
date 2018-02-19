const multer = require('multer');
const path = require('path');
const router = require('express').Router();


//set up storage engine
const storage = multer.diskStorage({
	destination: 'data/uploads',
	filename: function(req, file, cb){
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	}
});


//init upload
const upload = multer({
	storage: storage,
	limits:{
		fileSize: 1000000
	},
	fileFilter : function(req, file, cb){
		checkFileType(file, cb);
	}
}).single('data');


//Check file type
function checkFileType(file, cb){
	// allowed extensions
	const filetypes = /pdf|doc|doc|docx|txt/;
	//check the extension
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	//check the mime type
	const mimetype = filetypes.test(file.mimetype);

	if(extname && extname){
		return cb(null, true);
	}
	else{
		cb('Error: INVALID File type!');
	}

}

router.get('/', (req, res)=>{
	res.render('upload');
});


router.post('/', (req,res)=>{
	upload(req, res, (err)=>{
		if(err){
			res.render('upload', {msg:err});
		}

		else{
			if(req.file == undefined)
			{
				res.render('upload', {msg: "Error: no file selected"});
				console.log(req.body);
			}

			else{
				console.log(req.file);
				res.render('upload', {msg: "FILE UPLOADED!"});
			}
		}
	})
})



module.exports = router;