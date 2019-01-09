const mysql = require("./mysql") ;
const response = require("./basic.response") ;
const MenuService = {
	get : () => {
		const _sql = 'select id , name from project' ;
		return new Promise( ((resolve, reject) => {
			mysql( con => {
				con.query(_sql , (err ,result) => {
					if(err){
						const data = response(false , null , null , err) ;
						reject(data) ;
					}else{
						const arr = [] ;

						result.forEach( item => {
							let obj = {
								children: [] ,
								iconPath: "anticon anticon-bars",
								id: item.id,
								isButton: 0 ,
								url : "/project/list/" + item.id ,
								menuDescriptions: [{
									description: item.name ,
									locale: "zh_CN"
								}]
							} ;

							arr.push(obj) ;
						});
						const data = response(true ,arr  , '') ;
						resolve(data) ;
					}
				});
			});
		}));
	},
}
module.exports = MenuService ;