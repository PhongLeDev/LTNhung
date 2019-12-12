#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <SocketIOClient.h>
#include <SerialCommand.h>
//include thư viện để kiểm tra free RAM trên con esp8266
extern "C" {
  ​#include "user_interface.h"
}
const byte RX = D1;
const byte TX = D2;
SoftwareSerial mySerial(RX, TX, false, 256); 
SocketIOClient client;
const char* ssid = "ROMROM";          //Tên mạng Wifi mà Socket server của bạn đang kết nối
const char* password = "0936500477";  //Pass mạng wifi ahihi, anh em rãnh thì share pass cho mình với.
char host[] = "172.16.0.130";  //Địa chỉ IP dịch vụ, hãy thay đổi nó theo địa chỉ IP Socket server của bạn.
int port = 3484;                  //Cổng dịch vụ socket server do chúng ta tạo!
extern String RID;
extern String Rfull; 
void setup()
{
Serial.begin(57600);
    ​mySerial.begin(57600); //Bật software serial để giao tiếp với Arduino, nhớ để baudrate trùng với software serial trên mạch arduin
    delay(10);
    Serial.print("Ket noi vao mang ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    ​//Chờ đến khi đã được kết nố
    while (WiFi.status() != WL_CONNECTED) { //Thoát ra khỏi vòng
        
        delay(500);
        ​Serial.print('.');
    }
    ​
 
    Serial.print("ket noi duoc vao mang");
    
}
