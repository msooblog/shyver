var http	=	require('http')
,	fs		=	require('fs')

,	config	=	require('./config.json')
//,	Console =	require('./Console.js').index//console和网页后台共用控制台

,	path	=	function(filename){
	return require.resolve(filename)
}//路径转换器
,	log		=	require('./log').show(true)

require('./log').watchDir(__dirname)


http.createServer(function(req,res){
	if(	require('./config.json').Server ){
		try{
			require('./route.js')(req,res)
			return
		}catch(err){
			log(err)
		}
	}
	res.writeHead(500,{"Content-Type":"text/html"})
	fs.readFile(path('./htm/404.html'),'utf8',function(err,data){
		if(err){
			res.write(err)
		}else{
			res.write(data)
		}
		res.end()
	})
}).listen(config.Port,function(err){
	if(err){
		console.log(err)
		console.log('端口被占用或者其他未知错误')
	}else{
		log('Server is running on '+config.Port)
		process.title	=	"http://127.0.0.1:"+config.Port
	}
})

process.stdin.on('data',function(data){
	var str	=	data.toString()
	if(str=='reload\r\n'){
		console.log(reload(path('./route.js')))
	}else if(str=='cache\r\n'){
		console.log(log(require.cache))
	}
})

process.on('uncaughtException',function(){
	console.log(arguments)
})
process.on('error',function(){
	console.log(arguments)
})
/*
process.stdout.on('data',function(data){
	process.stdout.write(data)
})*/