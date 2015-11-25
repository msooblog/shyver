/*
*author:shynome
*tags:mobile	touch	swipe
*need:ui.css,shy.js,shy.swipe.js
*path:css3,html5
 */
shy.ready(function(){
	/*side touch switch*/
	//on
	var side	=	shy.swipe(shy.$('#side'))
	side('end',function(self,touch){
		var self=shy.$(self)
		if(	touch.type==='left'	){
			self.removeClass('active')
		}
	})
	//off
	var body	=	shy.swipe(shy.$('body'))
	body('end',function(self,touch){
		if(	touch.type==='right'){
			shy.$('#side').addClass('active')
		}
	})
})