import React from 'react';
import './App.css';

import { Layout, Menu, Avatar, Breadcrumb, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import Title from 'antd/lib/typography/Title';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ padding: 10 }}>
          <Avatar style={{ float: 'right' }} src='./logo512.png' />
          <Title style={{ color: 'white' }} level={2}>AUTO MACHINE</Title>
        </Header>
        <Layout>
          <Sider style={{ background: 'fff' }}>
            <Menu
              defaultSelectedKeys={['Dashboard']}
              mode="inline"
            >
              <Menu.Item key='Dashboard'>
                Dashboard
              </Menu.Item>
              <SubMenu
                title={
                  <span>
                    <UserOutlined></UserOutlined>
                    <span>About US</span>
                  </span>
                }
              >
                <Menu.ItemGroup key='AboutUs' title='About US'>
                  <Menu.Item key='A'>
                    A
                  </Menu.Item>
                  <Menu.Item key='B'>
                    B
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>

              <Menu.Item>
                <UserOutlined></UserOutlined>
                <span>Add User</span>
              </Menu.Item>

              <SubMenu
                title={
                  <span>
                    <UserOutlined></UserOutlined>
                    <span>Add User</span>
                  </span>
                }
              >
              </SubMenu>
            </Menu>
            
          </Sider>

          <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-content">Content</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;
