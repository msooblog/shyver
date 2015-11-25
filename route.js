var url		=	require('url')
,	handle	=	{
	"file"		: 	'./file'
	,"admin"	: 	'./hezhong/admin'
	,"index"	: 	'./hezhong/index'
	,'user'		:	'./hezhong/user'
	,'product'	: 	'./hezhong/product'
}//实时获取刷新后的缓存
/*
*这种写法是直接访问主分支中的缓存，不访问这个缓存下的子类缓存，同时也不会增加children的数目
*这样我只要删除主分支的缓存就可以实现热更新了，并且这样写不会增加children的数目，就是不会有内存问题
*不过这样就等价于在执行require(string)的别名func()return require('str')
 */
var htm		=	function(){return	require('./htm')}()
console.log(htm)
module.exports=function(req,res){
	var pathname	=	url.parse(req.url).pathname
	,	func		=	pathname.split('/')[1]
	if( handle[func] && typeof require(handle[func])	===	"function"){
		require(handle[func])(req,res,pathname.slice((func.length+1)))
	}else{		
		require(handle["index"])(req,res,pathname)
	}
}
