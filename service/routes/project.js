var express = require('express');
var router = express.Router();
var servive = require('./service/project.service') ;
var listServive = require('./service/list.service') ;
var classifyService = require('./service/classify.service') ;
var fs = require("fs") ;
var path = require("path") ;
var multer = require("multer");

/* GET home page. */


var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.join(__dirname , "../public/images"));
	},
	filename: function(req, file, cb) {
		let arr = file.originalname.split(".") ;
		req.query.imageName = `${req.query.name }.${arr[arr.length - 1 ]}` ;
		cb(null, `${req.query.name }.${arr[arr.length - 1 ]}`)
	}
});


var upload = multer({ storage: storage });

/* GET home page. */
router.get('/config', function(req, res, next) {
	// res.render('index', { title: 'Express' });
	var pageSize = req.query.pageSize || 10;
	var pageNumber = req.query.currentPage || 1 ;
	var projectName = req.query.projectName ;
	var enabled = req.query.enabled ;
	servive.get(pageNumber , pageSize , projectName , enabled)
		.then( data => {
			res.send(data)
		})
		.catch( err => res.send(err))

});
router.get('/config/enum', function(req, res, next) {
	servive.enum()
		.then( data => {
			res.send(data)
		})
		.catch( err => res.send(err))

});
router.post("/config" , (req,res,next) => {
	var data = req.body ;
	servive.post(data)
		.then( data => {
			res.send(data) ;
		})
		.catch( err => {
			res.send(err) ;
		});
});

router.put("/config" , (req,res,next) => {
	var data = req.body ;
	servive.put(data)
		.then( data => {
			res.send(data) ;
		})
		.catch( err => {
			res.send(err) ;
		});
});
router.delete("/config/:id" , (req,res,next) => {
	var id = req.params.id ;

	servive.delete(id)
		.then( data => {
			res.send(data);
		})
		.catch( err => {
			res.send(err) ;
		});
});

// 类别

router.get("/classify" ,(req,res,next) => {
	var pageSize = req.query.pageSize || 10;
	var pageNumber = req.query.currentPage || 1 ;
	var name = req.query.name ;
	var projectId = req.query.projectId ;
	classifyService.get(pageNumber , pageSize , name , projectId)
		.then( data => {
			res.send(data) ;
		})
		.catch( err => {
			res.send(err) ;
		});
});
router.post("/classify" , (req,res,next) => {
	var data = req.body ;
	classifyService.post(data)
		.then( data => {
			res.send(data) ;
		})
		.catch( err => {
			res.send(err) ;
		});
});

router.get("/list" , ( req , res , next) => {
	var pageSize = req.query.pageSize || 10;
	var pageNumber = req.query.currentPage || 1 ;
	var name = req.query.name ;
	listServive.get( pageNumber , pageSize , name )
		.then( data => {
			res.send(data)
		})
		.catch( err => res.send(err))
});

router.post("/list" , upload.single('img'), function(req, res, next) {
	var data = req.body ;

	listServive.post(data)
		.then( data => {
			res.send(data)
		})
		.catch( err => res.send(err))
});

module.exports = router;
