var	fs 		=	require('fs')
,	path	=	require('path')

var header	=	fs.readFileSync(path.join(__dirname,'head.html'),'utf8')
,	footer	=	fs.readFileSync(path.join(__dirname,'foot.html'),'utf8')

fs.watch(path.join(__dirname,'head.html'),function(){
	header	=	fs.readFileSync(path.join(__dirname,'head.html'),'utf8')
})
fs.watch(path.join(__dirname,'foot.html'),function(){
	footer	=	fs.readFileSync(path.join(__dirname,'foot.html'),'utf8')
})

,	head	=	function	(ajax)	{
	var htmlHead =	header

	if(typeof ajax.head	===	'object'){
		for(var i in ajax.head){
			htmlHead	+=	ajax.head[i]+'\r\n'
		}
	}

	if(!ajax.title)ajax.title	=	'no title';

	htmlHead	+=	'<title>'+ajax.title+'</title>\r\n</head>\r\n<body>\r\n'

	return	htmlHead
}
,	foot	=	function	()	{
	return footer
}
,	body	=	function	(ajax)	{
	d
}
function htm(req,res,ajax) {
	if(!ajax['httpStatus'])		ajax['httpStatus']		=	200
	if(!ajax['Content-Type'])	ajax['Content-Type']	=	'text/html';

	var resHeader		=	{"Content-Type":ajax['Content-Type']+';charset=utf-8'}
	,	reqHeadersAjax	=	req.headers.ajax
	
	if(reqHeadersAjax){
		if(ajax['body'][reqHeadersAjax]){
			resHeader['ajax']	=	reqHeadersAjax
			res.writeHead(200,resHeader)
			res.write(ajax['body'][reqHeadersAjax])
			res.end()
			return
		}else{
			resHeader['ajax']			=	false;
		}
	}
	res.writeHead(200,resHeader)
	res.write(head(ajax))
	for(var i in ajax['body']){
		res.write(ajax['body'][i])
	}
	res.write(foot())
	res.end()
}
module.exports	=	htm