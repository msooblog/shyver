exports.index=function (data) {
	var data	=	data.toString()
	try{
		eval(data)
	}catch(err){
		console.log(err)
	}
}