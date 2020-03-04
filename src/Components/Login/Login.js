import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends Component {
    formRef = React.createRef();
    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    render() {
        return (
            <div style={{width:'35%', margin:'auto', textAlign:'center',marginTop:'65px'}}>
                <Form
                ref={this.formRef}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                style={{padding:'35px 35px 15px 35px',background:'white'}}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            </div>
            
        );
    }
}

export default Login;