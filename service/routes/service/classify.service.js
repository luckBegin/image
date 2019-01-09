const mysql = require("./mysql") ;
const response = require("./basic.response") ;
const ProjectService = {
	get : ( pageNumber , pageSize , name , projectId ) => {

		let _sql = 'select id , name , remark  , projectId  , createTime from classify' ;
		let _countSql = "select count(id) as count from classify" ;
		let arr = [] ;

		if(name || projectId){
			_sql += " where " ;
			_countSql += ' where ' ;
		};

		if(name){
			_sql += ' name = ?' ;
			_countSql += " name = " + name ;
			arr.push(name) ;
		};

		if(projectId){
			_sql += ' projectId = ?' ;
			_countSql += " projectId = " + projectId ;
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

	},

	post : ( data ) => {
		return new Promise( ( (resolve, reject) =>  {
			const _sql = `insert into classify( name , remark  , projectId ) values(? , ? , ?)` ;

			mysql( con => {
				con.query(_sql , [data.name , data.remark , data.projectId ] , ( err ,result ) => {
					if(err)
						reject( response(false ,'', '' , err ));
					else
						resolve( response(true , ''  , '' , '' )) ;
				});
			})
		}));
	}
}
module.exports = ProjectService ;