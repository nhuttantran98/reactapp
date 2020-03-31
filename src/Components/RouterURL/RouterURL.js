import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
    Route,
    Switch,
  } from "react-router-dom";
import TestContentBar1 from '../TestContentBar1/TestContentBar1';
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

class RouterURL extends Component {

    render() {  
        return (
                <div>
                    <Switch>
                        <Route  exact path="/" component={Login}/>
                        <ProtectedRoute  path="/all-user" component={UserTable}/>
                        <ProtectedRoute  path="/add-user" component={UserAddAccount}/>
                        <ProtectedRoute  path="/all-machine" component={MachineTable}/>
                        <ProtectedRoute  path="/machine/:name" component={Machine}/>
                        <ProtectedRoute  path="/edit-user" component={EditUser}/>
                        <ProtectedRoute  path="/edit-machine" component={MachineEdit}/>
                        <ProtectedRoute  path="/add-machine" component={MachineAdd}/>
                        <ProtectedRoute exact path ="/1" component={TestContentBar1}/>
                        <Route  component={page404}/>

                    </Switch>
                </div>
        );
    }
}


export default withRouter(RouterURL);