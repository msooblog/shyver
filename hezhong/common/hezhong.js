shy.ready(function(){
var product	=	{
	pathname	: 	'/user'
	,container	: 	document.getElementById('product_all').getElementsByClassName('main')[0]
	,reqComplete:true
	,add: function(json){
		var self=this
		json.forEach(function(e){
			var bar=document.createElement('div')
			bar.className='bar'
			bar.dataset.id='product_id_'+e.id
			bar.innerHTML='<div class="handle">+购物车</div>'
			var one=document.createElement('div')
			one.className='goods'
			one.innerHTML='<div class="img"></div>'
			+'<div class="main">'
			+'<span class="name">'+e.name+'</span>'
			+'<span class="description">'+e.detection+'</span>'
			+'</div>'
			+'<div class="price"><span class="title">价格</span><span class="main">'+e.price+'</span></div>'
			
			var swipe=shy.swipe(one)
			swipe('end',function(self,touch,e){
				var style=self.getAttribute('style').replace('transition:all 0s;','')
				self.setAttribute('style',style)
				if(touch.moveX<200){
					self.setAttribute(	'style'	,'transform:matriX(1,0,0,1,0,0);')
				}else{
					self.setAttribute(	'style'	,'transform:matriX(1,0,0,1,360,0);')
				}
			})
			swipe('right',function(self,touch,e){
				e.preventDefault()
				if(touch.moveX<-30)return;
				self.setAttribute(	'style'	,'transition:all 0s;transform:matriX(1,0,0,1,'+(touch.moveX)+',0);')
			})
			swipe('start',function(self,touch,e){
				self.setAttribute(	'style'	,'transform:matriX(1,0,0,1,0,0);')
			})
			bar.appendChild(one)
			self.container.appendChild(bar)
		})
	}
	,req:function(num){
		var self=this
		if(!this.reqComplete)return	console.log('请求还未完成，请勿重复提交');
		//this.reqComplete	=	false
		if(typeof	num	!==	'number'	||	num <	0	)return	alert('请求参数错误：'+typeof num);
		shy.ajax(this.pathname,{
			ajax:'product_get'
			,page:num
		},function(json){
			self.reqComplete=true
			if(json.err)return self.err(json);
			return	self.add(json)
		})
	}
	,err:function(json){
		var err=document.createElement('div')
		err.className='err'
		err.textNode=json.err
		this.container.appendChild(err)
		return	true
	}
}
var	sort 	=	{
	pathname 	: 	'/user/sort'
	,container	: 	document.getElementById('header')
	,add 		: 	function	(json){
		var self =	this
		console.log(this)
		json.forEach(function(e){
			var span=document.createElement('span')
			span.className='nav'
			span.innerHTML=e.replace('.json','')
			self.container.appendChild(span)
		})
	}
	,req 		: 	function(){
		var self=this
		shy.ajax(this.pathname,{ajax:'sort'},function(json){
			self.add(json)
		})
	}
}
sort.req()
	product.req(0)
	product.req(0)
	product.req(0)
	var c=shy.swipe(document.getElementById('product_all'))
	c('end',function(self,touch){
		if(touch.type!=='up')return
		self.lastElementChild.innerHTML='正在加载'
		self.lastElementChild.innerHTML='继续上拉加载更多'
	})
	c('up',function(self,touch){
		if(touch.scrollTopMax===self.scrollTop)self.lastElementChild.innerHTML='松开加载更多';
	})
	c('start',function(self,touch){
		touch.set('scrollTopMax',(self.scrollHeight-self.clientHeight));
		if(touch.scrollTopMax===self.scrollTop)self.lastElementChild.innerHTML='继续上拉加载更多';
	})
	var page=document.getElementsByClassName('page')[0]
})