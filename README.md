# Static-File-Server
Static file server built in Node.js. Mime is limited to plain text and json only, images and videos are not supported yet

To make this server accessible to other devices on local net, pass the IP address of the device running this server in app.listen(port,ip,callback), then modify router's configuration and enable port forwarding on desired port to route all incoming request to your server.
