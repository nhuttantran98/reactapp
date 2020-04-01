import React, { Component } from 'react';
import {Layout, Breadcrumb} from 'antd';
const { Content } = Layout;
class DataStatitics extends Component {
    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <Breadcrumb.Item></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>Thong ke du lieu</div>
            </Content>
        );
    }
}

export default DataStatitics;