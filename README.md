
<h1 align="center">
  <br>
  <img src="https://github.com/burst-your-bubble/App/blob/master/static/favicon.ico" alt="Burst Your Bubble" width="200"></a>
  <br>
  <a href="http://byb.tatebosler.com">Burst Your Bubble</a>
  <br>
</h1>

<h4 align="center">Fake news real comps.</h4>

<p align="center">
  <a href="#what-is-burst-your-bubble">What is Burst Your Bubble?</a> •
  <a href="#where-can-i-find-it">Where can I find it?</a> •
  <a href="#how-can-i-run-it-locally">How can I run it locally?</a> •
  <a href="#bugs-and-suggestions">Bugs and Suggestions</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#authors-and-acknowledgments">Authors and Acknowledgments</a>
</p>

## What is Burst Your Bubble?
Today’s media interfaces present social opinions to us with a monotone composition. The lack of balance and diversity in content has created filter bubbles all around us, leading to a loss of common understanding. Admittedly, getting our news from various social media sources is much better than relying on one or two TV networks or newspapers but their relevance based algorithmic approach isn’t cutting it. Burst Your Bubble is a web application that attempts to broaden your political awareness!

## Where can I find it?
Find it at [byb.tatebosler.com](http://byb.tatebosler.com/)

## How can I run it locally?
In Terminal:
```bash
mkdir BurstYourBubble
git clone https://github.com/burst-your-bubble/App.git
```

In two terminal windows:
One for the server build
```bash
cd App
pip3 install -r requirements.txt
python3 run.py
```

Another for the static build
```bash
cd App
npm install
npm run watch
```

Finally open your browser and go to [http://localhost:5000/](http://localhost:5000/)

## Bugs and Suggestions
Please see the [issues](https://github.com/burst-your-bubble/App/issues) section to report any bugs or feature requests and to see the list of known issues.

## Contributing
If you would like to contribute code you can do so through GitHub by forking the repository and sending a pull request. When submitting code, please make every effort to follow existing conventions and style in order to keep the code as readable as possible.

## Authors and Acknowledgments
Carleton College Computer Science Senior Thesis by
> Tate Bosler &nbsp;&middot;&nbsp;
> Computer Science and Economics

> Ritvik Kar &nbsp;&middot;&nbsp;
> Computer Science and Cinema & Media Studies 

> Aidan White &nbsp;&middot;&nbsp;
> Computer Science

> Kaixing Wu &nbsp;&middot;&nbsp;
> Computer Science

Advisor
> [David Musicant](https://www.cs.carleton.edu/faculty/dmusicant/) &nbsp;&middot;&nbsp;
> Professor of Computer Science, Carleton College 

Data Sources 
> [NewsAPI.org](https://newsapi.org/)

> [AllSides.org](https://www.allsides.com/)

> [r/Politics](https://www.reddit.com/r/politics/)
