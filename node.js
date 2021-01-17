var qs = require('querystring');
var imageData = "";
var myId = 1;
/* Запуск сервера */
if(req.method == "POST"){
	var fullBody = "";
	req.on('data', function(chunk){
		fullBody += chunk.toString();
	});
	req.on('end', function(){
		res.writeHead(200, {'Content-Type': 'text/html'});
		var POST = qs.parse(fullBody);
		if(POST["p"] == "new"){ // Смена изображения
			imageData = POST["text"];
			myId += 1;
			res.write(imageData);
		}else if(POST["p"] == "ajax"){
			if(myId > parseInt(POST["last"])){
				if(typeof(imageData) != "undefined"){
					res.write(document.body.innerHTML = ('<img src=" + '"' + imageData + '"' + "/>'); " + "\n")";
					res.write("last_message_id = " + myId + ";");
				}
			}
		}
		res.end();
	});
}else{ /* Здесь идёт отдача всего, что пользователь просит. */}
var last_message_id = 0, 
	load_in_process = false; 
function Load() {
    if(!load_in_process)
    {
	    load_in_process = true;
    	$.post("/", 
    	{
      	    p: "ajax", 
      	    last: last_message_id,
			version: version
    	},
   	    function (result) {
		    eval(result);
		    load_in_process = false; 
    	});
    }
}
var loadInterval = setInterval(Load, 1);
