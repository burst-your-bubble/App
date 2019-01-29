#!/bin/bash
cd /srv/comps

npm install
npm run build
pip3 install -r requirements.txt
cp /home/ubuntu/news_config.py server/config.py
apachectl restart
service apache2 restart
