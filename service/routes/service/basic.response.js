module.exports = function(success , data , page , msg){
	return {
		success : success || false  ,
		data : data || "" ,
		page : page || "" ,
		message : msg || ""
	};
};