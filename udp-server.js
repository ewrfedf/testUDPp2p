var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var ip1='',p1;
var ip2='',p2;

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

function sendInfo(ip,port,message) {
	server.send(message, port, ip, function(err, bytes) {
	    if (err) throw err;
	    // console.log('发送对方	Ip 信息：' + ip +':'+ port+message);
	});
}

server.on('message', function (message, remote) {
    if(ip1==''){
		ip1=remote.address;
		p1=remote.port;
		console.log('ip1 初始化 ' + remote.address + ":" + remote.port);
		return;
    }else if(ip2==''){
    	if(ip1==remote.address&&p1==remote.port){
    		return;
    	}
		ip2=remote.address;
		p2=remote.port;
		console.log('ip2 初始化' + remote.address + ":" + remote.port);
		sendInfo(ip1,p1,Buffer.from(ip1+":"+p1+"|"+ip2+':'+p2));
    	sendInfo(ip2,p2,Buffer.from(ip2+":"+p2+"|"+ip1+':'+p1));
		return;
    } 
});

server.bind(33333);
