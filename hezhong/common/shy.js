shy	=	{}
shy.ready	=	function	(func){
	setTimeout(func,0)
}
shy.$	=	function(selector){
	var one
	if(typeof	selector	===	'object'	){
		one	=	selector
		one.__proto__.all 	=	null
	}else{
		one	=	document.querySelector(selector)
		one.__proto__.selector	=	selector
		one.__proto__.all		=	document.querySelectorAll(selector)
	}
	one.__defineGetter__('self',function(){
		return this
	})
	one.__defineGetter__('length',function(){
		return	this.all.length
	})
	one.__proto__.has			=	function	(className,name)	{
		if(	!	className 	)	className 	=	'';
		className.replace('.',' ')
		className.replace('#',' ')
		if(	className.search(' '+name)	!==	-1	)return	' '+name;
		if(	className.search(name+' ')	!==	-1)	return	name+' ';
		if(	className	===	name 	)	return	name;
		return	false
	}
	one.__proto__.hasClass	=	function	(name)	{
		return	this.has(one.self.className,name)
	}
	one.__proto__.addClass	=	function	(name)	{
		var splice	=	this.hasClass(one.className,name)
		if(!splice)	one.className 	=	one.className 	+' '+	name;
	}
	one.__proto__.removeClass	=	function	(name)	{
		var splice	=	this.hasClass(one.className,name)
		if(splice)	one.className 	=	one.className.replace(splice,'');
	}
	one.__proto__.child=function	(name){
		var arr			=	[]
		,	children	=	this.children
		if(	typeof	name 	===	'number'	){
			return	shy.$(children[name])
		}else if(	typeof	name 	===	'string'	){
			return	shy.$(this.querySelector(name))
		}else{
			for(var i=0;i<children.length;i++){
				var a	=	shy.$(children[i])
				arr.push(a)
			}
			return	arr
		}
	}
	return	one
}