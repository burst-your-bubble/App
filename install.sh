#!/bin/bash
cd /srv/comps

npm install
npm run build
pip install -r requirements.txt
apachectl restart
service apache2 restart
