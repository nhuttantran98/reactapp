import React, { Component } from 'react';
import './App.css';

import { Layout, Menu, Avatar, Breadcrumb, Button, Card } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  ProjectFilled,
} from '@ant-design/icons';
// import SubMenu from 'antd/lib/menu/SubMenu';
import Title from 'antd/lib/typography/Title';
// import RouterURL from '../RouterURL/RouterURL';
// import { Router, Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapse: false,
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <PieChartOutlined />
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <DesktopOutlined />
                <span>Option 2</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
                    <span>User</span>
                  </span>
                }
              >
                <Menu.Item key="3">Quản lý</Menu.Item>
                <Menu.Item key="4">Vận hành</Menu.Item>
                <Menu.Item key="4">Add User</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <TeamOutlined />
                    <span>Máy sấy</span>
                  </span>
                }
              >
                <Menu.Item key="6">Danh sách</Menu.Item>
                <Menu.Item key="8">Thêm máy sấy</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <FileOutlined />
                <span>Công thức sấy</span>
              </Menu.Item>
              <Menu.Item key="10">
                <ProjectFilled />
                <span>Thống kê</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                Bill is a cat.
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
      </Layout>
    );
  }
}

export default App;
