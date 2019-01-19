#!/bin/bash
cd /srv/comps

npm install
npm run build
. ./venv/bin/activate
pip install -r requirements.txt
deactivate
sudo apachectl restart
