const PORT = 3484;									//Đặt địa chỉ Port được mở ra để tạo ra chương trình mạng Socket Server
const DO = 2000;
const RE  = 2500;
const MI =3000;
const PHA =3490;
const SON =3920;
const LA =4400;
const SI =4930;
const DO2 =5300;
// const DO = 262;
// const RE  = 294;
// const MI =330;
// const PHA =349;
// const SON =392;
// const LA =440;
// const SI =493;
// const DO2 =530;





var http = require('http') 							//#include thư viện http - Tìm thêm về từ khóa http nodejs trên google nếu bạn muốn tìm hiểu thêm. Nhưng theo kinh nghiệm của mình, Javascript trong môi trường NodeJS cực kỳ rộng lớn, khi bạn bí thì nên tìm hiểu không nên ngồi đọc và cố gắng học thuộc hết cái reference (Tài liêu tham khảo) của nodejs làm gì. Vỡ não đó!
var socketio = require('socket.io')				//#include thư viện socketio
var ip = require('ip');
var app = http.createServer();					//#Khởi tạo một chương trình mạng (app)
var io = socketio(app);								//#Phải khởi tạo io sau khi tạo app!
app.listen(PORT);										// Cho socket server (chương trình mạng) lắng nghe ở port 3484
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
io.on('connection', function(socket) {	
    console.log("Connected"); 
	
	var json2 = {
		"led": [[2500,750,2],[3000,700,3],[3490,650,4],[3920,600,2],[4400,550,3],[4930,500,4],[5300,450,3]]
	}
	io.sockets.emit('RECORD',json2);
	var keyValue;
		socket.on('record', function (msg){
			var json = [];
			var node;
			for (const tone of msg){
				var totalFrequency = 0;
				var totalDelay = 0;
				if ( tone.name == 'silent'){
					
				}
				else{
					for ( const key of tone.name){
						switch ( key) {
							case "KeyA":
								totalFrequency += DO;
								totalDelay +=800;
						  break;
						case "KeyS":
							totalFrequency += RE;
							totalDelay += 750;
						  break;
						case "KeyD":
							totalFrequency += MI;
							totalDelay += 700;
						  break;
						case "KeyF":
							totalFrequency += PHA;
							totalDelay += 650;
						  break;
						case "KeyJ":
							totalFrequency += SON;
							totalDelay += 600;
						  break;
						case "KeyK":
							totalFrequency += LA;
							totalDelay += 550;
						  break;
						case "KeyL":
							totalFrequency += SI;
							totalDelay += 500;
						  break;
						case "Semicolon":
							totalFrequency += DO2;
							totalDelay += 450;
						  break;
						}
					}
				totalFrequency = totalFrequency / tone.name.length ; 
			totalDelay /= tone.name.length ; 
				}
				console.log("fre",totalFrequency,"delay",totalDelay,'.....', tone.time+500);

			json = [...json, totalFrequency, totalDelay, tone.time]; //có một phần tử là "led", phần tử này chứa giá trị của mảng led.;

			// setTimeout(() => {
				// }, 500);
				console.log('ledConsole',json);
			}
			io.sockets.emit('LED', {json}); //Gửi lệnh LED với các tham số của của chuỗi JSON
			console.log({json});
		})




		socket.on('glosPlay', function (msg) {
			var totalFrequency =0 ;
			var totalDelay = 0 ;
			console.log(msg);
			for (const key of msg) {
				switch(key){
					case "KeyA":
						totalFrequency += DO;
						totalDelay +=800;
				  break;
				case "KeyS":
					totalFrequency += RE;
					totalDelay += 750;
				  break;
				case "KeyD":
					totalFrequency += MI;
					totalDelay += 700;
				  break;
				case "KeyF":
					totalFrequency += PHA;
					totalDelay += 650;
				  break;
				case "KeyJ":
					totalFrequency += SON;
					totalDelay += 600;
				  break;
				case "KeyK":
					totalFrequency += LA;
					totalDelay += 550;
				  break;
				case "KeyL":
					totalFrequency += SI;
					totalDelay += 500;
				  break;
				case "Semicolon":
					totalFrequency += DO2;
					totalDelay += 450;
				  break;
					}
			}


			totalFrequency = totalFrequency / msg.length ; 
			totalDelay /= msg.length ; 
			console.log("player move",totalFrequency);
			
			var json = {
				"led": [totalFrequency,totalDelay,200] //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
			}
			io.sockets.emit('LED', json) //Gửi lệnh LED với các tham số của của chuỗi JSON

	});

	
	//Khi socket client bị mất kết nối thì chạy hàm sau.
	socket.on('disconnect', function() {
		console.log("disconnect") 	//in ra màn hình console cho vui
		// clearInterval(interval1)		//xóa chu kỳ nhiệm vụ đi, chứ không xóa là cái task kia cứ chạy mãi thôi đó!
	});
});