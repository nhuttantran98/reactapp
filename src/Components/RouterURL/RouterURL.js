import React, { Component } from 'react';
import {
    // BrowserRouter as Router,
    Route,
    Switch,
  } from "react-router-dom";
import TestContentBar1 from '../TestContentBar1/TestContentBar1';
import TestContentBar2 from '../TestContentBar2/TestContentBar2';
import UserTable from '../UserPage/UserTable/UserTable';
import UserAddAccount from '../UserPage/UserAddAccount/UserAddAccount';
import Login from '../Login/Login';
import Machine from '../Machine/Machine';
import ProtectedRoute from '../ProtectRoute/protectRoute';
class RouterURL extends Component {
    
    

    render() {
        
        return (
                <div>
                    <Switch>
                        <Route  exact path="/" component={Login}/>
                        {/* <Route  path="/1" component={TestContentBar1}/> */}
                        <Route  path="/2" component={TestContentBar2}/>
                        <Route  path="/all-user" component={UserTable}/>
                        <Route  path="/add-user" component={UserAddAccount}/>
                        <Route  path="/may-a" component={Machine}/>
                        <ProtectedRoute exact path ="/1" component={TestContentBar1}/>
                        <Route  component={Login}/>

                    </Switch>
                </div>
        );
    }
}


export default RouterURL;