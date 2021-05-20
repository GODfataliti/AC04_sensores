//SERVIDOR
var http = require('http');
var fs = require('fs');
var net = require('net');

//crear servidor http
var server = http.createServer(function (req, res){
	fs.readFile('./index.html', function(error,data,data2){
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write(data, 'utf-8');
		res.end();
	});
}).listen(1080,'192.168.1.83', ()=>{
	console.log('[!] SERVIDOR ENCENDIDO [!]');
});


//Crear websocket
var io = require('socket.io')(server);

//crear socket
var s = new net.Socket();
s.connect(9000,'192.168.1.83');
var s2 = new net.Socket();
s2.connect(8000,'192.168.1.83');

//recibo de datos desde servidor
s.on('data',function(data){
	data = data.toString();
	console.log('Voltaje: '+data);
	io.emit('lectura',data);
	var data = 'Voltaje: ' + data + '\r\n';
	//guardar data en archivo de texto
	fs.appendFile('datos2.txt',data,function(err){
		if(err) throw err;
	});
});

s2.on('data',function(data){
	data = data.toString();
	console.log('Nota n°: '+data);
	io.emit('lectura2',data);
	var data = 'Nota n°: ' + data + '\r\n';
	//guardar data en archivo de texto
	fs.appendFile('datos2.txt',data,function(err){
		if(err) throw err;
	});
});


