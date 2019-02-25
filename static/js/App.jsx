import React from 'react';

import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import { Article }from './Pages/Article';
import { History }from './Pages/History';
import { Register }from './Pages/Register';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export class App extends React.Component {

    render() {
       return (
            <Router>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" component={Home} />
                    <Route path="/history" component={History} />
                    <Route path="/article/:id" component={Article} />
                </div>
            </Router>
       ); 
    }
}