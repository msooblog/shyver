var	path		=	require('path')
,	fs			=	require('fs')
,	show	=	function (Switch){
	if(Switch){
		return console.log
	}else{
		return	function(){return}
	}
}
var	log			=	show(true)

var	pathUrl		=	function (dirname,extStr) {
	if(!extStr)	extStr	=	'';
	log('主目录：'+dirname)
	var dirname	=	path.join(dirname,extStr)
	log('相对目录：'+dirname)
	return	function(data){
		if(!data)return path.join(dirname);
		return path.join(dirname,data)
	}
}

,	watchDir	=	function(pathname){
	fs.readdir(pathname,function(err,data){
		if(err){
		}else{
			log(pathname+'已被监听')
			fs.watch(pathname,function(type,filename){
				switch(type){
					case	'change'	:
					var cache	=	path.join(pathname,filename)
					if(require.cache[cache]){
						delete require.cache[cache]
						log('\r\n'+cache+'缓存已被清除')
						return
					}else{
						//log(cache)
					}
					break
					case	'rename'	:
					if(filename){
						watchDir(path.join(pathname,filename))
						log(pathname+'出现了新文件：'+filename)
						return
					}else{
						log(pathname+'有一个文件消失了')
						return 'delete'
					}
					break
					default	:
					log(arguments)
					return
				}
					
			})
			for(var i in data){
				watchDir(path.join(pathname,data[i]))
			}
		}
	})
}
,	remove		=	function(pathname){

	var removeDir	=	function(childname,pathname){
		log(childname)
		fs.readdir(childname,function(err,data){
			if(err){
				if(fs.statSync(childname).isFile()){
					return fs.unlinkSync(childname)
				}else{
					return false
				}
			}else{
				log(data)
				for(var i in data){
					var childname	=	path.join(childname,data[i])
					removeDir(childname,pathname)
				}
				try{fs.rmdirSync(pathname)}catch(err){}
			}
		})
	}

	removeDir(pathname,pathname)
}

module.exports	=	{
	"path"		:	pathUrl
	,'watchDir'	:	watchDir
	,'show'		:	show
	,'remove'	: 	remove
}