import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import App from '../App/App';
import User from '../User/User';
import Machine from '../Machine/Machine';
class RouterURL extends Component {
    render(){
        return(
            <Router>
                <div>
                <Route exact path="/" component={App}/>
                <Route  path="/Machine" component={Machine}/>
                </div>
            </Router>
        );
    }
}

export default RouterURL;