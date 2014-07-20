/*
  Web Server Estación Meteorológica
 
 Tomar los datos de un DHT22 y enviar por ethernet
 
 
 
 */

#include <SPI.h>
#include <Ethernet.h>
#include <DHT22.h>

#define DHT22_PIN 2     // pin señal sensor


//#define DHTTYPE DHT11   // DHT 11 
#define DHTTYPE DHT22   // DHT 22  (AM2302)
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

// Connect pin 1 (on the left) of the sensor to +5V
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND
// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor

DHT22 myDHT22(DHT22_PIN);
DHT22_ERROR_t errorCode;
// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network:
byte mac[] = { 
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192,168,100,22);

// Initialize the Ethernet server library
// with the IP address and port you want to use 
// (port 80 is default for HTTP):
EthernetServer server(80);

void setup() {
 // Open serial communications and wait for port to open:
  Serial.begin(9600);
   while (!Serial) {
     ;// wait for serial port to connect. Needed for Leonardo only
  }

  Serial.println("DHT22 test!");
 
  // start the Ethernet connection and the server:
  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("La IP del servidor es ");
  Serial.println(Ethernet.localIP());
}


void loop() {
  delay(2000);
  // escucho los clientes
  EthernetClient client = server.available();
  if (client) {
    Serial.println("Cliente Nuevo");
    // an http request ends with a blank line
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        // if you've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so you can send a reply
        if (c == '\n' && currentLineIsBlank) {
          // send a standard http response header
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: application/json"); //enviamos en json
          client.println("Connection: close");  // the connection will be closed after completion of the response
	  client.println("Refresh: 5");  // refresh the page automatically every 5 sec
          client.println();
          
          //SENSOR
          errorCode = myDHT22.readData();

          float t = myDHT22.getTemperatureC();
          float h = myDHT22.getHumidity();
  
          // Check if any reads failed and exit early (to try again).
          if (isnan(h) || isnan(t)) {
            Serial.println("Failed to read from DHT sensor!");
            return;
          }

          
          // output the value of each analog input pin
          for (int analogChannel = 0; analogChannel < 1; analogChannel++) {
            //int sensorReading = analogRead(analogChannel);
            client.print("{\"Humedad\": ");
            client.print(h);
            client.print(", \"Temperatura\": ");
            client.print(t);
            client.println("}");       
          }
          //sclient.println("</html>");
          break;
        }
        if (c == '\n') {
          // you're starting a new line
          currentLineIsBlank = true;
        } 
        else if (c != '\r') {
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        }
      }
    }
    // give the web browser time to receive the data
    delay(1);
    // close the connection:
    client.stop();
    Serial.println("client disonnected");
  }
}

