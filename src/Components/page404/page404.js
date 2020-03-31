import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Link, } from 'react-router-dom';
import './page404.css'
const { Content } = Layout;
class page404 extends Component {
    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div className="container">
                    <h2>Oops! Page not found.</h2>
                    <h1>404</h1>
                    <p>We can't find the page you're looking for.</p>
                    <Link to='/'>GO BACK HOME</Link>
                </div>
            </div>
          </Content>
        );
    }
}

export default page404;