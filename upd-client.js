// 例子：UDP服务端
// var targetHOST = '127.0.0.1';
var targetHOST = '94.191.127.164';
var targetPORT = 33333;
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var message = Buffer.from('My KungFu is Good!');
var process = require('child_process');
// process.exec('say 开始');
var isGet = false;
server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
    server.send(message, targetPORT, targetHOST, function(err, bytes) {
	    if (err) throw err;
	    console.log('UDP message sent to ' + targetHOST +':'+ targetPORT);
	});
});

 
server.on('message', function (message, remote) {

	if(message.toString().includes('|')){
		var ips=message.toString().split("|");
		var myIp=ips[0];
		var targetIp=ips[1];
	    console.log(' ---+++--- ' + message);
		var target=targetIp.split(":");
		var my=myIp.split(":");
		var msg=Buffer.from('^H^');
		server.send(msg, target[1], target[0], function(err, bytes) {
	    	if (err) throw err;
	    	console.log('UDP message sent to ' + target[1] +':'+ target[0]);
	    	server.send(msg, target[1], target[0], function(err, bytes) {
		    	if (err) throw err;
		    	console.log('UDP message sent to ' + target[1] +':'+ target[0]);
			});
		});
	}else{
		console.log(remote.address+":"+ remote.port+' 收到信息：'+message);
	}
	
	
	
});

server.bind();
