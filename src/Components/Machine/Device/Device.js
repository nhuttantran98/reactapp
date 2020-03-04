import React, { Component } from 'react';
import {Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
class Device extends Component {
    render() {
        return (
            <div style={{margin:'60px',background: '#ececec', padding:'10px 40px'}}>
                <div style={{textAlign:'center',fontSize:'25px',fontFamily:'monospace',fontWeight:'bold'}}>QUẠT HÚT</div>
                <div style={{textAlign:'center'}}>
                    <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }}></Avatar>
                </div>
            </div>
        );
    }
}

export default Device;