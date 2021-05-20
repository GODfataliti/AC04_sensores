//SENSOR 1

var net = require('net');

var server = net.createServer(function(socket){

	socket.on('error', function(error){
        if (error.code=='ECONNRESET'){
            console.log('[LOG] Conexion perdida [!]');
        };
    });

	function SensorVoltaje()
	{
		while(true){
			Voltaje = Math.random()*60+1;
			Voltaje = Math.floor(Voltaje);
			socket.write(Voltaje.toString());
			console.log('Voltaje: %s',Voltaje);
			setTimeout(SensorVoltaje,3000);
			return Voltaje;
		}
	}
	SensorVoltaje();
});

server.listen(9000,'192.168.1.83', ()=>{
	console.log('[!] SENSOR 1: ACTIVADO [!]');
});