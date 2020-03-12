import React, { Component } from 'react';
import {Layout, Breadcrumb,Form, Input, Button} from 'antd'
import {register} from '../../MachineFunction/MachineFunction'
import swal from 'sweetalert';

const { Content } = Layout;
const { TextArea } = Input;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
class MachineAdd extends Component {
    formRef = React.createRef();
    onFinish = values => {
        console.log(values);
        register({name: values.name, discription: values.discription,position: values.position}).then(res=>{
            console.log(res);
            if(res.error){
                swal({
                    title: "Oppss...!",
                    text: "Tên máy đã tồn tại!",
                    icon: "error",
                    button: "OK",
                  });
            }else{
                swal({
                    title: "Tadaaa...!",
                    text: "Tạo máy thành công!",
                    icon: "success",
                    button: "OK",
                  });
            }
        })
    }
    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360}}>
                    <h1 style={{margin:'10px',fontSize:'45px'}}>Tạo máy sấy</h1>
                    <div style={{marginRight:'250px',paddingBottom:'15px'}}>
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Form.Item name="name" label="Tên máy sấy" rules={[
                                                                    { required: true,message: 'Xin nhập Tên máy sấy' }
                                                                    ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="position" label="Vị trí đặt máy" rules={[{ required: true,
                                message: 'Xin hãy nhập Vị trí đặt máy!', }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="discription" label="Mô tả máy sấy" rules={[{ required: true,
                                message: 'Xin hãy nhập Mô tả!', }]}>
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

export default MachineAdd;