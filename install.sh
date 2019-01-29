#!/bin/bash
cd /srv

sudo chown -R ubuntu comps
cd /srv/comps

npm install
npm run build
pip3 install -r requirements.txt
cp /home/ubuntu/news_config.py server/config.py
sudo apachectl restart
sudo service apache2 restart
