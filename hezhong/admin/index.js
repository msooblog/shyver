module.exports=function (req,res,pathname){
	res.writeHead(200)
	res.write(JSON.stringify(pathname)+"fffffffffffffffffffff")
	res.end()
}