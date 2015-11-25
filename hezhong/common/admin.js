shy.ready(function(){
	var form 		=	document.getElementById('login')
	var login	=	function(){
		var username=form.children[0].value
		,	password=form.children[1].value
		shy.ajax(
			'/user'
			,{ajax:'login',username:username,password:password}
			,function(res,req){
				if(!res.err){
					localStorage.login=JSON.stringify([req.username,req.password])
					toggleLogin()
					console.log('登录成功')
				}else{
					console.log('登录失败')
				}
			})
	}
	form.children[2].onclick=login
	function toggleLogin(){
		var arr=shy.$('#side').child()
		var active
		for(var i in arr){
			if(arr[i].hasClass('active')){
				active	=	arr[i]
				break
			}
		}
		if(active){
			active.removeClass('active')
			active.addClass('hidden')
		}
		if(localStorage.login){
			var bar_login=shy.$('#side').child(1)
			bar_login.addClass('active')
			bar_login.addEventListener('animationend',function(){
				bar_login.removeClass('hidden')
			},false)
		}else{
			var bar_logined=shy.$('#side').child(0)
			bar_logined.addClass('active')
			bar_logined.addEventListener('animationend',function(){
				bar_logined.removeClass('hidden')
			},false)
		}
	}
	document.getElementById('exit').onclick=function(){
		localStorage.clear()
		toggleLogin()
	}
	toggleLogin()
})