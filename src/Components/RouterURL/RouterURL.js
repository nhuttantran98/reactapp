import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
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
import EditUser from '../UserPage/EditUser/EditUser';
import MachineTable from '../MachinePage/MachineTable/MachineTable';
import MachineAdd from '../MachinePage/MachineAdd/MachineAdd';
import MachineEdit from '../MachinePage/MachineEdit/MachineEdit';
import socketIOClient from 'socket.io-client';

class RouterURL extends Component {
   
    render() {  
        return (
                <div>
                    <Switch>
                        <Route  exact path="/" component={Login}/>
                        <Route  path="/2" component={TestContentBar2}/>
                        <Route  path="/all-user" component={UserTable}/>
                        <Route  path="/add-user" component={UserAddAccount}/>
                        <Route  path="/all-machine" component={MachineTable}/>
                        <Route  path="/may-a" component={Machine}/>
                        <Route  path="/edit-user" component={EditUser}/>
                        <Route  path="/edit-machine" component={MachineEdit}/>

                        <Route  path="/add-machine" component={MachineAdd}/>
                        <ProtectedRoute exact path ="/1" component={TestContentBar1}/>
                        <Route  component={Login}/>

                    </Switch>
                </div>
        );
    }
}


export default withRouter(RouterURL);