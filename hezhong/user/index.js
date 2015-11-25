var db			=	require('../../sql').db
,	user		=	new	db(	'user'	)
,	product		=	new	db('product')
,	sort 		=	new db('sort')
/*length*/
if(	product.add('all').err	)	product.add('all',{'length':0});

/*用户中心代码开始*/
function	create(post){
	console.log(post)
	var username	=	post.username
	,	password	=	post.password
	if(	typeof	post.username	!==	'string'	||	post.username.length	>	16	){
		return	{
			'err'	: 	'用户名类型应为字符串或过长，请使用16以下的字符串'
			,'name'	: 	'username'
		}
	}
	if(	!	user.add(username).err	){
		return	{
			'err'	: 	'用户名已存在'
			,'name'	: 	'username'
		}
	}
	if(	typeof	post.password	!==	'string'	||	post.password.length	>	24	){
		return	{
			'err'	: 	'密码类型不正确或过长，请使用24以下的字符串'
			,'name'	: 	'password'
		}
	}
	var newUser	=	{
		'username'	: 	username
		,'nickname'	: 	username
		,'password'	: 	password
	}
	return	user.add(username,newUser)
}
function	update(	post )	{
	if(	post.update	!==	'object'	)	return	{	err	: 	'没有要更新的数据'	}
	post.update.type 	=	1
	return	user.add(	post.username	,post.update	)
}
function	get(	postData	,one 	)	{
	return	one
}
/*用户中心代码结束*/

/*
*产品相关的开始
*ps:因为添加产品需要用户权限，所以放在这里
*/
function	product_add(	post	){
	if(	!	post.product )	return	{	err	: 	"产品信息不存在"};
	if(	typeof	post.product.name	!==	'string'	||	typeof	post.product.price	!==	'number'	|| typeof post.product.sort	!==	'string' )	return	{	err	: 	'请输入产品名称、分类和价格'};
	var obj	=	post.product
	var good	=	{
		'name'			: 	null
		,'price'		: 	null
		,'sort'			: 	null
		,'picture'		: 	[]
		,'description'	: 	'暂无描述'
	}
	for(var i in obj){
		good[i]	=	obj[i]
	}
	var length	=	product.add(	'all'	).length
	var	err 	=	product.add(	length.toString()	,	good	)
	if(	!	err.err	){
		product.add(	'all'	,{'length':	(length+1)	})
		var arr=good.sort.split(',')
		arr.forEach(function(e){
			sort_add(e,length+1)
		})
		return	product.add(	length.toString()	)
	}else{
		return	{	err	: 	'添加失败,错误：'	+	err.err	}
	}
}
function	product_update(	post	){
	if(typeof post.product.update!=='object')return	{err:'没有要更新的数据'};
	return	product.add(	post.product.id 	,	post.product.update	)
}
function	product_get(	post 	){
	var arr		=	[]
	,	page	=	parseFloat(post.page)//从零开始
	,	num		=	5
	,	start	=	page*num
	,	end 	=	(page+1)*num
	for(var i=start;i<end;i++){
		var obj	=	product.add(i.toString())
		if(	!	obj.err	)	arr.push(obj)
	}
	if(arr.length===0)return	{err:'没有产品'};
	return	arr
}
function	product_one	(	post 	){
	return	product.add(post.product.id)
}

/*产品结束*/
/*分类开始*/
function	sort_add(	name 	,id	){
	var length	=	sort.add(name).length
	return sort.add(name,{length:id})
}
function	sort_all(){
	return	sort.all()
}
/*分类结束*/



/*
*要求登录的都走login函数，login传入两个参数[请求json对象,用户json对象]
 */
function	login(	post	,callback	){
	if(typeof post.username !==	'string')return	{err:'username is undefined'};
	if(typeof post.password !==	'string')return	{err:'password is undefined'};
	var one	=	user.add(	post.username	)
	if(	one	&&	one.password	===	post.password	){
		if(typeof	callback	===	'function'	)	return	callback(post,one);
		else										return	{'username':post.username,'login':'true'};
	}else{
		return	{	'err'	: 	'login fail'}
	}
}
function	admin(	post 	,callback	){
	var one	=	user.add(	post.username	)
	if(	one	&&	one.password	===	post.password	&&	one.type	===	0	){
		if(typeof	callback	===	'function'	)	return	callback(post,one);
		else										return	{'username':post.username,'login':'true'};
	}else{
		return	{	'err'	: 	'login fail'}
	}
}

var	handle	=	{
	'create'	: 	create
	,'login'	: 	login
	,'get'		:	function(post){return	login(post,get)}
	,'update'	: 	function(post){return	login(post,update)}
	,'product_add'		: 	function(post){return	admin(post,product_add)}
	,'product_update'	: 	function(post){return	admin(post,product_update)}
	,'product_one'		: 	product_one
	,'product_get'		: 	product_get
	,'sort'				: 	sort_all
}

module.exports	=	function (req,res,pathname){
	var post 	=	''
	req.setEncoding('utf8')
	req.on('data',function(postData){
		post 	+=	postData
	})
	req.on('end',function(){
		var reqAjax	=	req.headers.ajax
		if(!reqAjax){
			res.writeHead(403,{'Content-Type':'text/plain;charset=utf8'})
			res.end('只有神知道的访问方式')
			return
		}
		try{
			post 	=	JSON.parse(post)
		}catch(err){
			res.writeHead(403,{'Content-Type':'application/json;charset=utf8'})
			res.end(JSON.stringify({'err':'数据格式不正确'}))
			return
		}//过滤掉不正确的访问格式


		res.writeHead(200,{'Content-Type':'application/json;charset=utf8'})
		if(typeof handle[reqAjax]	===	'function'){
			res.write(	JSON.stringify	(	handle[reqAjax]	(post)	)	)
		}else{
			res.write(	JSON.stringify	(	{	'err'	: 	'没有这个处理函数'	}	)	)
		}
		res.end()
		return
	})
}