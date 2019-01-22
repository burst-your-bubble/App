#!/bin/bash
cd /srv/comps

sudo python3 -m virtualenv venv
npm install
npm run build
. ./venv/bin/activate
pip install -r requirements.txt
deactivate
sudo apachectl restart
sudo service apache2 restart
