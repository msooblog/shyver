var	fs		=	require('fs')
,	Source	=	function(){return require('../log')}
,	path 	=	Source().path(__dirname+'/db')
,	log		=	Source().show(true)
,	get 	=	function (db,str){
}
,	create	=	function (db_name,callback){
	var	pathname	=	path('./'+db_name)
	fs.exists('./helo',function(exists){
		if(exists){
			log('文件夹已存在，请手动删除，路径：'+pathname)
			return false
		}else{
			return fs.mkdir(pathname,function(err){
				if(err){
					return false
				}else{
					return '数据库'+db_name+'创建成功'
				}
			})
		}
	})
}
,	db		=	function (db_name)	{
	if(!db_name)return {"err":"没有数据库名称"};
	var pathname	=	path(db_name)
	var db_obj	=	{
		"pathname"		:	pathname
		,"name"			:	db_name
		,"all"		: 	function(){
			return	fs.readdirSync(this.pathname)
		}
		,"file_exists"	:	function(json_name,callback){
			/*
			*无错误返回回调函数(stat,pathname)，否则返回错误信息
			 */
			if(typeof json_name !== "string" )return {"err":"名字类型不对或没有"};
			var pathname	=	require('path').join(this.pathname,json_name+'.json')
			log(pathname)
			try{
				return callback(fs.existsSync(pathname),pathname)
			}catch(err){
				return	{"err":err}
			}
		}
		,"remove"		: 	function (json_name) {
			//不使用,未实现
			return this.file_exists(json_name,function(stat,pathname){
				if(stat)return	fs.unlinkSync(pathname);
				else	return	{};
			})
		}
		,"add"			:	function(json_name,json_object){
			return this.file_exists(json_name,function(stat,pathname){
				if(stat	&&	!	json_object )	return	require(pathname);
				if(typeof json_object!=="object")return	{"err":"数据类型应为object"};
				if(stat){
					var json=JSON.parse(fs.readFileSync(pathname,'utf8'))
					var arr	=	[]
					for(var i in json_object){
						json[i]	=	json_object[i]
						arr.push(i)
					}
					fs.writeFileSync(pathname,JSON.stringify(json))
					return	{'return':arr.toString()}
					console.log('')
				}else{
					json_object['id']=json_name
					fs.writeFileSync(pathname,JSON.stringify(json_object),'utf8')
					return	{'return':pathname+'  has created'}
				}
			})
		}
	}
	if(fs.existsSync(pathname)){
		return	db_obj
	}else{
		for(var i in this){
			return	{"pathname":db_name+"不存在,请使用new创建"}
		}
		var err	=	fs.mkdirSync(pathname)
		if(err){
			return	err
		}else{
			for(var i in db_obj){
				this[i]	=	db_obj[i]
			}
			return
		}
	}
}

module.exports={
	'db'		:	db
}