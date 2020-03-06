import React, { Component } from 'react';
import './Navbar.css'
import { UserOutlined,LogoutOutlined,LoginOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import auth from '../auth';
class Navbar extends Component {

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        auth.logout(()=>{
          this.props.history.push(`/`)
        })
    }

    loginRegLink = (
        <ul style={{height:"100%",paddingRight:'15px'}}>
            <li style={{float:"right"}} className="a-navbar"><Link to="/" style={{height:"100%"}}><LoginOutlined style={{fontSize:"35px",paddingTop:"13px"}}></LoginOutlined></Link></li>
        </ul>
    )

    userLink = (
        <ul style={{height:"100%",paddingRight:'15px'}}>
            <li style={{float:"right"}} className="a-navbar"><a href="#a" onClick={this.logOut.bind(this)} style={{height:"100%"}}><LogoutOutlined style={{fontSize:"35px",paddingTop:"13px"}}></LogoutOutlined></a></li>
            <li style={{float:"right"}} className="a-navbar"><Link to="/all-user" style={{height:"100%"}}><UserOutlined style={{fontSize:"35px",paddingTop:"13px"}}></UserOutlined></Link></li>
        </ul>
    )
    render() {
        return (
            <div>
                {localStorage.usertoken ? this.userLink : this.loginRegLink}
            </div>
        );
    }
}

export default withRouter(Navbar);