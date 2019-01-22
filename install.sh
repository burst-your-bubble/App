#!/bin/bash
cd /srv/comps

cp activate_this.py venv/bin/activate_this.py
npm install
npm run build
. ./venv/bin/activate
pip install -r requirements.txt
deactivate
sudo apachectl restart
sudo service apache2 restart
