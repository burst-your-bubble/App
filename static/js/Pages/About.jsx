import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { Navigation } from '../Components/Navigation';

export const About = () => {
    return (
        <div className="container">
            <PageHeader className="homeTitle">
                <span style={{fontFamily: 'Avenir Next'}}>About</span>
            </PageHeader>
            <Navigation/>
            <br></br>
            <h4>Welcome to Burst Your Bubble!</h4>
            <p>
                Today’s media interfaces present social opinions to us with a monotone composition. The lack of balance and diversity in content has created filter bubbles all around us, leading to a loss of common understanding. Admittedly, getting our news from various social media sources is much better than relying on one or two TV networks or newspapers but their relevance based algorithmic approach isn’t cutting it. <b>Burst Your Bubble</b> is a web application that attempts to broaden your political awareness!<br></br>
                <br></br>
                <div className="indentText">
                <b>Our Vision:</b> Eliminate the spread of misinformation and echo-chambers in mass media consumption.<br></br>
                <b>Our Mission</b>: Deliver a balanced source of perspectives from across the spectrum, to gain global insight on issues.<br></br>
                </div>
                <br></br>
                Thank you for trying out a whole new way of consuming news! In Burst Your Bubble, we've curated some of the most important news topics for the day. <br></br>
                In 3 simple steps you too can "Burst Your Bubble":<br></br>
                1. Within each topic, we've provided you with 5 articles from various parts of the political spectrum.<br></br>
                2. Read the articles, and record what you think of the opinion presented in the article<br></br>
                3. Keep reading and reacting, we'll update the articles we show you to keep you well informed!<br></br><br></br>
            </p>
            <h4>Data Sources</h4>
            <p>
                <ul>
                    <li><a href="https://newsapi.org/">NewsAPI.org</a></li>
                    <li><a href="https://www.allsides.com/">AllSides.com</a></li>
                    <li><a href="https://www.reddit.com/r/politics/">r/Politics</a></li>
                </ul>
            </p>
        </div>
    );
}