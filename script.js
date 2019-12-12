
 function setKeyPress(keyPress){
	console.log("setKeyPress was called");
	switch(keyPress){
		
		case "KeyA":
			setKeyValue(1);
			break;
		case "KeyS":
			setKeyValue(2);
			break;	
		case "KeyD":
			setKeyValue(3);
			break;
		case "KeyF":
			setKeyValue(4);
			break;	
		case "KeyJ":
			setKeyValue(5);
			break;
		case "KeyK":
			setKeyValue(6);
			break;
		case "KeyL":
			setKeyValue(7);
			break;
		case "Semicolon":
			setKeyValue(8);
			break;					
		default:
			setKeyValue(-1);
			break;
	}
 }
  