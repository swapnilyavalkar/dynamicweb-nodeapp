#!/bin/bash
cd /home/ubuntu/My-Node-JS-Web-Application/web-app
curl -sL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install
sudo npm install express