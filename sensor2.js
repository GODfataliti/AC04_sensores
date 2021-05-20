//SENSOR 2

var net = require('net');


var server = net.createServer(function(socket){

	socket.on('error', function(error){
        if (error.code=='ECONNRESET'){
            console.log('[LOG] Conexion perdida [!]');
        };
    });

	function Piano(){
		while(true){
			Nota = Math.random()*8 + 1 ;
			Nota = Math.floor(Nota);
			socket.write(Nota.toString());
			console.log('Voltaje: %s',Nota);
			setTimeout(Piano,3000);
			return Nota;
		}
	}
	Piano();

});

server.listen(8000,'192.168.1.83', ()=>{
	console.log('[!] SENSOR 2: ACTIVADO [!]');
});