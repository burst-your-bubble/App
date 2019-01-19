# App

If you want to run it, you’ll need to have npm installed if you don’t already. Clone the repository, run `npm install` in the static folder to install the javascript dependencies, then (ideally in a python virtual environment) install the python dependencies in `requirements.txt`. Then run `npm run dev-build` (or  `npm run watch` if you want it to automatically rebuild changes) to build the react/js stuff with webpack, and then starting the flask server should do it. We can go over this when we meet next as well.

**Update:** AWS CodePipeline will automatically update the main site anytime `master` receives a code push.
