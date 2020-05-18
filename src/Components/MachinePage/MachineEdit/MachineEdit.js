import React, { Component } from 'react';
import { Layout, Breadcrumb, Form, Input, Button } from 'antd'
import swal from 'sweetalert';
import {getProfileMachine, updateMachine} from '../../MachineFunction/MachineFunction'

const { Content } = Layout;
const { TextArea } = Input;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
class MachineEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "-1"
        }
    }

    async componentDidMount(){
        const machine = await getProfileMachine({id:this.props.location.aboutProps.id});
        console.log(machine);
        if(machine){
            this.formRef.current.setFieldsValue({
                name: machine.name,
                description: machine.description,
                position: machine.position
            })         
            this.setState({
                id: machine.id
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
        updateMachine({id: this.state.id,name: result.name, position: result.position, description: result.description,code:result.code}).then(res=>{
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
                    text: `Tên máy có thể bị trùng. Hãy thử lại!`,
                    icon: "error",
                    button: "OK",
                });
            }
        })
        console.log(result);
    };

    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <h1 style={{ margin: '10px', fontSize: '45px' }}>Chỉnh sửa thông tin máy sấy</h1>
                    <div style={{ marginRight: '250px', paddingBottom: '15px' }}>
                        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                            <Form.Item name="name" label="Tên máy sấy" rules={[
                                { required: true, message: 'Xin nhập Tên máy sấy' }
                            ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="position" label="Vị trí đặt máy" rules={[{
                                required: true,
                                message: 'Xin hãy nhập Vị trí đặt máy!',
                            }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Mô tả máy sấy" rules={[{
                                required: true,
                                message: 'Xin hãy nhập Mô tả!',
                            }]}>
                                <TextArea row={4} />
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
            </Content>
        );
    }
}

export default MachineEdit;