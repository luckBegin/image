const mysql = require("./mysql") ;
const response = require("./basic.response") ;
const ListService = {
	get : ( pageNumber , pageSize , name  ) => {

		let _sql = 'select path , name ,projectId , classifyId , createTime , id from image ' ;
		let _countSql = "select count(id) as count from image " ;
		let arr = [] ;

		if(name){
			_sql += " where name = ?" ;
			_countSql += " where name = ' " + name  + " ' " ;
			arr.push(name) ;
		};

		// if(arguments.length <= 2 )
		_sql += ` limit ${ (pageNumber - 1) * pageSize } , ${ pageSize * pageNumber }` ;

		return new Promise( ((resolve, reject) => {
			mysql( con => {
				con.query(`${_sql}; ${ _countSql } ` , arr , (err ,result) => {
					if(err){
						const data = response(false , null , null , err) ;
						reject(data) ;
					}else{
						const page = {
							pageSize: pageSize ,
							totalNumber: result[1][0].count
						};
						const data = response(true , result[0] , page ) ;
						resolve(data)
					}
				});
			});
		}));
	},

	post : (data) => {
		let _sql = 'insert into image(path , name ) values(?,?)' ;
		let arr = [ data.path , data.name ] ;
		return new Promise( ((resolve, reject) => {
			mysql(con => {
				con.query(_sql , arr , ( err , result ) => {
					if(err){
						reject( response(false , '' , '' , err)) ;
					}else{
						resolve( response(true , '' , '' ,'' )) ;
					};
				});
			});
		}));
	},

	delete : ( id ) => {
		const _sql = 'delete from image where id = ?' ;
		return new Promise( ((resolve, reject) => {
			mysql( con => {
				con.query(_sql , [id] , ( err ,result ) => {
					if(err){
						reject( response(false , '' , '' , err)) ;
					}else{
						resolve( response(true , '' , '' ,'' )) ;
					};
				});
			});
		}));
	}
};
module.exports = ListService ;
