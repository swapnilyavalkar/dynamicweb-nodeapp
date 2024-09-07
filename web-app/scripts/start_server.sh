#!/bin/bash
/home/ubuntu/My-Node-JS-Web-Application/web-app
pkill node || true
node app.js > app.log 2>&1 &