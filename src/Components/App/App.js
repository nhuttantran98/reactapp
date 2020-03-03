import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import SiderBar from '../SiderBar/SiderBar';
import ContentBar from '../ContentBar/ContentBar';

const { Header, Footer} = Layout;

class App extends Component {
  

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>     
        <SiderBar></SiderBar>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 ,minHeight:50}} />
          <ContentBar></ContentBar>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
