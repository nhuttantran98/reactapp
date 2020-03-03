import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import SiderBar from '../SiderBar/SiderBar';
import RouterURL from '../RouterURL/RouterURL';
import { BrowserRouter as Router, } from 'react-router-dom';


const { Header, Footer} = Layout;

class App extends Component {
  

  render() {
    return (
      <Router>
      <Layout style={{ minHeight: '100vh' }}>     
        <SiderBar></SiderBar>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 ,minHeight:50}} />
          <RouterURL></RouterURL>
          <Footer style={{ textAlign: 'center' }}>WebApp Control Fruit Dryers ©2020 Created by TNT</Footer>
        </Layout>
      </Layout>
      </Router>
    );
  }
}

export default App;
