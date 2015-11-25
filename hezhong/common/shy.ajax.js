shy.ajax	=	function	(	http	,req	,callback	)	{
	if(	typeof	http	!==	'string'		||	typeof	req	!==	'object'	||	typeof	req.ajax	!==	'string'	||	typeof	callback	!==	'function'	)	return	console.log('参数错误:'+req);
	var	ajax	=	new	XMLHttpRequest()
	if(!ajax)	return	console.log('对不起，你的设备不支持ajax,无法使用本站服务');
	if(!localStorage)	return console.log('对不起，你的设备不支持localStorage,无法使用本站服务');
	if(	localStorage.login 	){
		try{
			var login	=	JSON.parse(localStorage.login)
			req.username	=	login[0]
			req.password	=	login[1]
		}catch(err){
			return	'err:'+err
		}
	}
	ajax.open(	'POST'	,http	,true	)
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8")
	ajax.setRequestHeader("ajax",req.ajax)
	ajax.send(	JSON.stringify(	req	)	)
	ajax.onload	=	function	()	{
		try{
			switch(	this.status	){
				case 200:
				var res	=	JSON.parse(	this.responseText	)
				return	callback(res,req)
				break
				default	:
				return	console.log(this)
			}
		}catch(err){
			return	alert(err)
		}
	}
}