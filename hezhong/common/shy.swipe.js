shy.swipe	=	function(	ele	){
	if(	!ele	)return	console.log('参数不全，ele');

	var getType	=	function(touch){
		var arc	=	touch.moveY/touch.moveX
		if(	arc	<	1	&&	arc	>	-1 	){
			if(	touch.moveX	>	0 	){
				return	'right'
			}else 	if(	touch.moveX	<	0){
				return	'left'
			}
		}else 	if(	arc	>	1	||	arc	<	-1	){
			if(	touch.moveY	>	0 	){
				return	'down'
			}else 	if(	touch.moveY	<	0 	){
				return	'up'
			}
		}
		return	'move'
	}

	var touch 		=	{
		set 		: 	function(attr,value){
			this[attr]	=	value
			return	this[attr]
		}
		,type 		: 	null//滑动类型
		,handle 	: 	null//滑动事件
		,emit		: 	{
			right		: 	null
			,left		: 	null
			,up			: 	null
			,down		: 	null
			,start		: 	function(){return}
			,move		: 	function(){return}
			,end		: 	function(){return}
		}
	}//特权方法的特权对象

	var swipe	=	function(e){
		var self	=	this
		,	finger	=	e.targetTouches[0]
		touch.target	=	e.target
		switch(	e.type ){
			case	'touchstart'	:
			touch.startX	=	finger.clientX
			touch.startY	=	finger.clientY
			touch.type 		=	null
			return	touch.emit['start'](self,touch,e);
			break;
			case	'touchmove'		:
			touch.moveX		=	finger.clientX	-	touch.startX
			touch.moveY		=	finger.clientY	-	touch.startY
			touch.type		=	getType(touch)
			if(	!	touch.handle	){
				touch.handle	=	touch.emit[touch.type]
				if(	typeof	touch.handle	!==	'function'	)touch.handle	=	touch.emit['move'];
			}
			return	touch.handle(self,touch,e);
			break;
			case	'touchend'		:
			//touch.endX	=	touch.startX	+	touch.moveX
			//touch.endY	=	touch.startY	+	touch.moveY
			//finger.clientX，finger.clientY这两个属性这时不一定可以获取到，所以不返回这两个值减少运算
			touch.handle	=	false
			if(!touch.moveX)touch.moveX=touch.moveY=0;//no touchmovenull
			touch.type		=	getType(touch)
			return	touch.emit['end'](self,touch,e);
			break;
			default 				:
			return	false
			break;
		}
	}
	ele.addEventListener('touchstart',swipe,false)
	ele.addEventListener('touchmove',swipe,false)
	ele.addEventListener('touchend',swipe,false)
	return	function(	swipetype	,callback	){
		touch.emit[	swipetype	]	=	callback
	}
}