#!/bin/bash
cd /srv/comps

python3 -m virtualenv venv
npm install
npm run build
. ./venv/bin/activate
pip install -r requirements.txt
deactivate
apachectl restart
service apache2 restart
