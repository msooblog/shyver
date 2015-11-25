var htm		=	require('path').join(__dirname,'../../htm')
handle		=	{}

module.exports=function(req,res,pathname){
	ajax={
		title:'name'
		,body:{
			'0':pathname
		}
	}
	require(htm)(req,res,ajax)
}	