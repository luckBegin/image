const mysql = require("./mysql") ;
const response = require("./basic.response") ;
const ProjectService = {
	get : ( pageNumber , pageSize , projectName , enable ) => {

		let _sql = 'select id , name , remark , createTime from project' ;
		let _countSql = "select count(id) as count from project" ;
		let arr = [] ;

		if(projectName || enable){
			_sql += " where " ;
			_countSql += ' where ' ;
		};

		if(projectName){
			_sql += ' name = ?' ;
			_countSql += " name = " + projectName ;
			arr.push(projectName) ;
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

	put : ( data ) => {
		return new Promise( ((resolve, reject) => {
			let _sql = 'update project set ' ;
			const  arr = [] ;

			if( data.name ){
				_sql += ' name = ? ' ;
				arr.push(data.name) ;
			};

			if(data.remark){
				_sql += " , remark = ?" ;
				arr.push(data.remark) ;
			};

			_sql += ' where id =' + data.id ;

			mysql( con => {
				console.log(_sql) ;
				console.log(arr) ;
				con.query(_sql , arr , ( err ,result ) => {
					if(err)
						reject( response(false , err , '' , '' )) ;
					else
						resolve( response(true , "" , "" ,"" )) ;
				});
			})
		}));
	},

	delete : ( id ) => {
		let _sql = 'delete from project where id = ?' ;

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

	post : ( data ) => {
		return new Promise( ( (resolve, reject) =>  {
			const _sql = `insert into project( name , remark ) values(? , ?)` ;

			mysql( con => {
				con.query(_sql , [data.name , data.remark ] , ( err ,result ) => {
					if(err)
						reject( response(false ,'', '' , err ));
					else
						resolve( response(true , ''  , '' , '' )) ;
				});
			})
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
}
module.exports = ProjectService ;