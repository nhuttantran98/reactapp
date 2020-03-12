import React, { Component } from 'react';
import { Layout,Menu,Avatar } from 'antd';
import Title from 'antd/lib/typography/Title';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { Link, } from 'react-router-dom';

const {Sider } = Layout;
const { SubMenu } = Menu;

class SiderBar extends Component {
    state = {
        collapse: false,
      }
    
      onCollapse = collapsed => {
        this.setState({ collapsed });
      };
    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{minHeight:'60px'}}>
            <Avatar style={{ float: 'left' }} src='./logo512.png' ></Avatar>
            <Title style={{ color: 'white' }} level={3}>SHRIDEEP</Title>
          </div>
          
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>Thống kê dữ liệu</span>
                <Link to="/"></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <DesktopOutlined />
              <span>Công thức sấy</span>
              <Link to="/1"></Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined />
                  <span>Quản lý tài khoản</span>
                </span>
              }
            >
              <Menu.Item key="3">
                Tài khoản Quản lý
                <Link to="/all-user"></Link>
              </Menu.Item>
              <Menu.Item key="4">Tài khoản Vận hành</Menu.Item>
              <Menu.Item key="5">
                Tạo tài khoản
                <Link to="/add-user"></Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <UserOutlined />
                  <span>Quản lý máy sấy</span>
                </span>
              }
            >
              <Menu.Item key="6">
                Danh sách máy sấy
                <Link to="/all-machine"></Link>
              </Menu.Item>
              <Menu.Item key="7">
                Tạo máy sấy
                <Link to="/add-machine"></Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <TeamOutlined />
                  <span>Máy sấy</span>
                </span>
              }
            >
              <Menu.Item key="8">
                Máy A
                <Link to="/may-a"></Link>
              </Menu.Item>
              <Menu.Item key="9">Máy B</Menu.Item>
            </SubMenu>
            <Menu.Item key="10">

              <FileOutlined />
              Thiết lập nâng cao
              <Link to="/2"></Link>
            </Menu.Item>
          </Menu>
          
        </Sider>
        );
    }
}

export default SiderBar;