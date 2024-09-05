#!/bin/bash
pkill node || true
cd /home/ubuntu/My-Node-JS-Web-Application/web-app
sudo apt install npm -y
node app.js > app.log 2>&1 &