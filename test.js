module.exports=function(){
	for(var i in require){
		console.log(i,require[i])
	}
	console.log('___________________________________________________')
}