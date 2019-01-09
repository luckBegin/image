var express = require('express');
var router = express.Router();
var service = require("./service/menu.service") ;
/* GET users listing. */
router.get('/tree', function(req, res, next) {

	res.send({
		success: true ,
		data : [{
			children: [{
				iconPath: "anticon anticon-bars",
				id: 11,
				isButton : 0 ,
				url : '/project/list/none',
				menuDescriptions: [{
					description: "上传图片" ,
					locale: "zh_CN",
				}]
			}] ,
			iconPath: "anticon anticon-bars",
			id: 11,
			isButton: 0 ,
			menuDescriptions: [{
				description: "未分配" ,
				locale: "zh_CN"
			}]
		}]
	})

	// service.get()
	// 	.then( data => {
	// 		console.log(data);
	// 		res.send({
	// 			success: true ,
	// 			data : [{
	// 				children: [{
	// 					iconPath: "anticon anticon-bars",
	// 					id: 11,
	// 					isButton : 0 ,
	// 					url : '/project/list/none',
	// 					menuDescriptions: [{
	// 						description: "上传图片" ,
	// 						locale: "zh_CN",
	// 					}]
	// 				}] ,
	// 				iconPath: "anticon anticon-bars",
	// 				id: 11,
	// 				isButton: 0 ,
	// 				menuDescriptions: [{
	// 					description: "未分配" ,
	// 					locale: "zh_CN"
	// 				}]
	// 			}]
	// 		})
	// 	})
	// 	.catch(err => {
	// 		res.send(err) ;
	// 	})
});
module.exports = router;
// {
// 	children: [{
// 		iconPath: "anticon anticon-bars",
// 		id: 11,
// 		isButton : 0 ,
// 		url : '/project/config',
// 		menuDescriptions: [{
// 			description: "项目配置" ,
// 			locale: "zh_CN",
// 		}]
// 	},{
// 		iconPath: "anticon anticon-bars",
// 		id: 11,
// 		isButton : 0 ,
// 		url : '/project/classify',
// 		menuDescriptions: [{
// 			description: "项目分类" ,
// 			locale: "zh_CN",
// 		}]
// 	}] ,
// 		iconPath: "anticon anticon-bars",
// 	id: 11,
// 	isButton: 0 ,
// 	menuDescriptions: [{
// 	description: "项目管理" ,
// 	locale: "zh_CN"
// }]
// },

// ,{
// 	children: data.data,
// 		iconPath: "anticon anticon-bars",
// 		id: 11,
// 		isButton: 0 ,
// 		menuDescriptions: [{
// 		description: "项目列表" ,
// 		locale: "zh_CN"
// 	}]
// }