import React from 'react';
import { PageHeader } from 'react-bootstrap';

export const About = () => {
    return (
        <div className="container">
            <PageHeader>About</PageHeader>
            <h4>Welcome to Burst Your Bubble!</h4>
            <p>
                Burst Your Bubble is a web application that attempts to broaden your political awareness...
            </p>
            <h4>Special Thanks To</h4>
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