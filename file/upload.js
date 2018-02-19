const multer = require('multer');
const path = require('path');
const router = require('express').Router();
const file = require('../database/fileSchema');
// const model = file.model;



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
		fileSize: 3000000
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

	if(extname && mimetype){
		return cb(null, true);
	}
	else{
		cb('Error: INVALID File type!');
	}

}


router.get('/', (req, res)=>{
	res.render('upload');
});


//function
// function extractor(item){
// 	var name= [];
// 	var i = 0;
// 	item.forEach((files)=>{
// 		name[i++] = item.originalname;
// 		console.log(name[i]);
// 	})
// 	return name;
// }


// //view files
// router.get('/files', (req,res)=>{
// model.find({user_id: id}, (err, item)=>{
// 	if(err)
// 	{
// 				console.log(err);
// 				res.status(500).send(err);
// 				return;
// 	}
// 	else
// 		{		
// 			console.log(item);
// 			res.render('file', {files: item});
// 		}

// })

// })


//upload files
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
				new file({
						user_id: id,
						originalName: req.file.originalname,
						encoding: req.file.encoding,
						mimeType: req.file.mimetype,
						filename : req.file.filename,
						size: req.file.size
				}).save().then((newFile)=> {
					console.log('new file added');
					console.log(newFile);
				})


				res.render('upload', {msg:  req.file.originalname + " UPLOADED!"	});
			}
		}
	})
})



module.exports = router;