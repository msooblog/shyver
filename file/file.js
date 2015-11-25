var	log			=	{}
,	fs			=	require('fs')
,	path		=	require('path')

,	fileType	=	function(){return require('./fileType.json')}

	log.path	=	require('../log').path(__dirname,'../hezhong/common')
//第二个参数是要共享文件夹的相对位置

module.exports	=	function (req,res,pathname){
	var content	=	fileType()[path.extname(pathname)]
	if( content && typeof pathname	===	'string' ){
		if(!content['encode']){
			content['encode']	=	'utf8'
		}else{}
		var pathname	=	log.path(pathname)
		fs.readFile(pathname,content['encode'],function(err,data){
			if(err){
				res.writeHead(500,{'Content-Type':'text/plain;charset=utf-8'})
				res.end(log.path(pathname)+'失败')
			}else{
				res.writeHead(200,{
					'Content-Type':content['type']+';charset='+content['encode']
					,'Content-Length':fs.statSync(pathname).size
				})
				res.write(data,content['encode'])
				res.end()
			}
		})
		return
	}else{
		res.writeHead(413,{'Content-Type':'text/plain;charset=utf-8'})
		res.end('We will not reutrn anything for this extname')
		return
	}
}