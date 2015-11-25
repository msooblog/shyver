var db		=	require('../../sql').db
var product	=	new	db('product')


module.exports	=	function(req,res,pathname){
	res.writeHead(200)
	res.write('333333333')
	res.end()
}