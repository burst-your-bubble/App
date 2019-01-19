import sys
import logging

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/srv/comps/")

from app import app as application
