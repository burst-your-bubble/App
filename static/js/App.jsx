import React from 'react';

import { Home } from './Pages/Home';
import { Article }from './Pages/Article';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export class App extends React.Component {

    render() {
       return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/article/:id" component={Article} />
                </div>
            </Router>
       ); 
    }
}