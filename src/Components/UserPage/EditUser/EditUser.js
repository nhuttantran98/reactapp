import React, { Component, } from 'react';
import { Form, Input, Button,Radio, DatePicker} from 'antd';
import moment from 'moment';
import {getProfileUser,updateUser} from './../../UserFunction/UserFunction';
import swal from 'sweetalert';

// const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state={
            dob:"1900/12/12",
            id: "-1"
        }
    }
    

    async componentDidMount(){
        const user = await getProfileUser({id:this.props.location.aboutProps.id});
        console.log(user);
        if(user){
            this.formRef.current.setFieldsValue({
                email: user.email,
                phone: user.phone,
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name,
            })         
            this.setState({
                dob: user.dob,
                id: user.id
            })
            
        }
    }

    formRef = React.createRef();
    onFinish = values => {
        // const DOB = values['dob'];
        const result = {
            ...values,
            // 'dob': DOB.format('YYYY-MM-DD'),
        }
        updateUser({id: this.state.id,first_name: result.first_name, last_name: result.last_name, email: result.email, dob: this.state.dob,phone: result.phone, role: result.role}).then(res=>{
            if(res!=="error"){
                swal({
                    title: "Tadaa...!",
                    text: `${res}`,
                    icon: "success",
                    button: "OK",
                });
            }else{
                swal({
                    title: "Opposss...!",
                    text: `Email có thể bị trùng. Hãy thử lại!`,
                    icon: "error",
                    button: "OK",
                });
            }
        })
        console.log(result);
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFill = () => {
        this.formRef.current.setFieldsValue({
            email: 'Hello world!',
            first_name: 'male',
        });
    };


    render() {
        console.log("render");
        return (
            <div style={{margin:'60px', background:'white'}}>
                <h1 style={{margin:'25px',fontSize:'45px'}}>Thông tin tài khoản</h1>
                <div style={{marginRight:'250px',paddingBottom:'15px'}}>
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Form.Item name="email" label="Email" rules={[
                                                                    { type: 'email',message: 'Email không hợp lệ' },
                                                                    { required: true,message: 'Xin nhập Email' }
                                                                    ]}>
                            <Input />
                        </Form.Item>

                        {/* <Form.Item
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
                        </Form.Item> */}

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

                        {/* <Form.Item name="dob" label="Ngày sinh" rules={[{ type: 'object', required: true, message: 'Please select time!' }]}>
                            <DatePicker selected={moment(`${this.state.dob}`,"YYYY/MM/DD")} showTime format="YYYY/MM/DD" />
                        </Form.Item> */}
                        <Form.Item label="Ngày sinh" >
                            <DatePicker value={moment(`${this.state.dob}`,"YYYY/MM/DD") } format={"YYYY/MM/DD"} disabled></DatePicker>
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

export default EditUser;