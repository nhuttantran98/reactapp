import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import {login} from './../UserFunction/UserFunction';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
import auth from '../auth';
import './Login.css'
class Login extends Component {


    
    formRef = React.createRef();
    onFinish = values => {
        login({email:values.username,password:values.password}).then(res=>{
            if(res){
                auth.login(()=>{
                    this.props.history.push(`/may-a`);
                })
            }else{
                swal({
                    title: "Oppss...!",
                    text: "Sai Email hoac Password",
                    icon: "error",
                    button: "OK",
                  });
            }
        })
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