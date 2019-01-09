const mysql = require("./mysql") ;
const response = require("./basic.response") ;
const ListService = {
	get : ( pageNumber , pageSize , name  ) => {

		let _sql = 'select  path , name ,projectId , classifyId , createTime from image ' ;
		let _countSql = "select count(id) as count from image " ;
		let arr = [] ;

		if(name){
			_sql += " where name = ?" ;
			_countSql += " where name = ' " + name  + " ' " ;
			arr.push(name) ;
		};

		if(arguments.length < 2 )
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
		let _sql = 'delete from request where id = ?' ;
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
	},
	put: (data)  => {
		let _sql = 'update request set ' ;
		let arr = [] ;
		if(data.url){
			_sql += " url = ? ," ;
			arr.push(data.url) ;
		};

		if(data.method){
			_sql += ' method = ? , ' ;
			arr.push(data.method) ;
		};

		if(data.statusCode){
			_sql += ' statusCode = ? ,' ;
			arr.push(data.statusCode) ;
		};

		if(data.response){
			_sql += ' response = ? ,' ;
			arr.push(data.response) ;
		};

		if(data.remark){
			_sql += ' remark = ?' ;
			arr.push(data.remark) ;
		};

		_sql += ' where id = ' + data.id ;

		return new Promise( ( (resolve, reject) => {
			mysql( con => {
				con.query(_sql , arr , (err ,result) => {
					if(err){
						reject( response(false , '' , '' , err)) ;
					}else{
						resolve( response(true , '' , '' ,'' )) ;
					};
				});
			});
		}));
	},
	enum : ( ) => {
		let _sql = 'select id , name from project' ;
		return new Promise( ((resolve, reject) => {
			mysql( con => {
				con.query(`${_sql}` , (err ,result) => {
					if(err){
						const data = response(false , null , null , err) ;
						reject(data) ;
					}else{
						const data = response(true , result , "" ) ;
						resolve(data)
					}
				});
			});
		}));
	},
};
module.exports = ListService ;