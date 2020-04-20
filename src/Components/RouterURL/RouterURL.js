import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
    Route,
    Switch,
  } from "react-router-dom";
import UserTable from '../UserPage/UserTable/UserTable';
import UserAddAccount from '../UserPage/UserAddAccount/UserAddAccount';
import Login from '../Login/Login';
import Machine from '../Machine/Machine';
import ProtectedRoute from '../ProtectRoute/protectRoute';
import EditUser from '../UserPage/EditUser/EditUser';
import MachineTable from '../MachinePage/MachineTable/MachineTable';
import MachineAdd from '../MachinePage/MachineAdd/MachineAdd';
import MachineEdit from '../MachinePage/MachineEdit/MachineEdit';
import page404 from '../page404/page404';
import DataStatitics from '../DataStatitics/DataStatitics';
import Script from '../Script.js/Script';

class RouterURL extends Component {

    render() {  
        return (
                <div>
                    <Switch>
                        <Route  exact path="/" component={Login}/>
                        <Route  path="/data-statistics" component={DataStatitics}/>
                        <ProtectedRoute  path="/all-user" component={UserTable}/>
                        <ProtectedRoute  path="/add-user" component={UserAddAccount}/>
                        <Route  exact path="/all-machine" component={MachineTable}/>
                        <Route  path="/all-machine/:name" component={Machine}/>
                        <ProtectedRoute  path="/edit-user" component={EditUser}/>
                        <ProtectedRoute  path="/edit-machine" component={MachineEdit}/>
                        <ProtectedRoute  path="/add-machine" component={MachineAdd}/>
                        <ProtectedRoute exact path ="/script" component={Script}/>
                        <Route  component={page404}/>

                    </Switch>
                </div>
        );
    }
}


export default withRouter(RouterURL);