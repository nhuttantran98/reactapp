import React, { Component } from 'react';
import {
    // BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";
import TestContentBar1 from '../TestContentBar1/TestContentBar1';
import TestContentBar2 from '../TestContentBar2/TestContentBar2';
import ContentBar from '../ContentBar/ContentBar';
import UserTable from '../UserPage/UserTable/UserTable';
import UserAddAccount from '../UserPage/UserAddAccount/UserAddAccount';


class RouterURL extends Component {
    render() {
        return (
                <div>
                    <Switch>
                        <Route exact path="/" component={ContentBar}/>
                        <Route  path="/1" component={TestContentBar1}/>
                        <Route  path="/2" component={TestContentBar2}/>
                        <Route  path="/all-user" component={UserTable}/>
                        <Route  path="/add-user" component={UserAddAccount}/>
                        <Route  component={ContentBar}/>
                    </Switch>
                </div>
        );
    }
}

export default RouterURL;