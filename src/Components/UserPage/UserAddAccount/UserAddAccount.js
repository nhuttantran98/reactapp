import React, { Component, } from 'react';
import { Form, Input, Button,Radio, DatePicker} from 'antd';
import {register} from './../../UserFunction/UserFunction';
// const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
class UserAddAccount extends Component {
    formRef = React.createRef();
    onFinish = values => {
        const DOB = values['dob'];
        const result = {
            ...values,
            'dob': DOB.format('YYYY-MM-DD'),
        }
        register({first_name: result.first_name, last_name: result.last_name, password: result.password, email: result.email,dob: result.dob,phone: result.phone, role: result.role}).then(res=>{
            if(res){
                this.props.history.push(`/may-a`);
            }
        })
        console.log(result);
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFill = () => {
        this.formRef.current.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    render() {
        return (
            <div style={{margin:'60px', background:'white'}}>
                <h1 style={{margin:'25px',fontSize:'45px'}}>Thêm tài khoản</h1>
                <div style={{marginRight:'250px',paddingBottom:'15px'}}>
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Form.Item name="email" label="Email" rules={[
                                                                    { type: 'email',message: 'Email không hợp lệ' },
                                                                    { required: true,message: 'Xin nhập Email' }
                                                                    ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Xin hãy nhập mật khẩu!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Mật khẩu không trùng khớp!');
                                },
                            }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="role" label="Chức năng" rules={[{ required: true}]}>
                            <Radio.Group>
                            <Radio value="quanly">Quản lý</Radio>
                            <Radio value="vanhanh">Vận hành</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item name="first_name" label="Họ và đệm" rules={[{ required: true,
                                message: 'Xin hãy nhập Họ và tên đệm!', }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="last_name" label="Tên" rules={[{ required: true,
                                message: 'Xin hãy nhập Tên!', }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="dob" label="Ngày sinh" rules={[{ type: 'object', required: true, message: 'Please select time!' }]}>
                            <DatePicker showTime format="YYYY-MM-DD" />
                        </Form.Item>

                        <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true,
                                message: 'Xin hãy nhập Số điện thoại!', }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                Reset
                            </Button>
                            <Button type="link" htmlType="button" onClick={this.onFill}>
                                Fill form
                            </Button>
                        </Form.Item>
                    </Form>

                </div>

            </div>

        );
    }

}

export default UserAddAccount;