var child	=	require('child_process').fork('hezhong/hello')
console.log(process.pid+'main')
process.stdin.on('data',function(data){
	process.stdout.write(data)
})
require('http').createServer(function(req,res){
	console.log(req.writeable)
	child.send('message',reqq)
	process.on('message',function(data){
		res.writeHead(200)
		res.write(data)
		res.end()
	})
}).listen(3000)