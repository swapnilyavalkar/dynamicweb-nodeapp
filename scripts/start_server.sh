#!/bin/bash
pkill node || true
cd /home/ubuntu/My-Node-JS-Web-Application/web-app
node app.js > app.log 2>&1 &
