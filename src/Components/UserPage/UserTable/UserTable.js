import React, { Component } from 'react';
import { Table, Tag, Button, Layout, Breadcrumb } from 'antd';
import {getAllUsers,deleteUser} from './../../UserFunction/UserFunction';
import { Link, } from 'react-router-dom';
import swal from 'sweetalert';

const { Column, ColumnGroup } = Table;
const { Content } = Layout;


class UserTable extends Component {

    constructor(props) {
        super(props);
        this.state = {data:[]};
    }
    

    async componentDidMount(){
        const response = await getAllUsers();
        let myData = response;
        let result = myData.map(({ id: key, first_name: firstname, last_name: lastname, ...rest }) => ({ key, firstname, lastname, ...rest }));
        this.setState({
            data: result
        })
    }

    deleteUser = key=> {
        deleteUser({id:key}).then(res=>{
            console.log(key);
            if(res.error){
                swal({
                    title: "Oppss...!",
                    text: "Xóa không thành công!",
                    icon: "error",
                    button: "OK",
                  });
            }else{

                let tempData = this.state.data.filter(item => item.key !== key)
                console.log(tempData);
                this.setState({
                    data: tempData
                })
                swal({
                    title: "Tadaaa...!",
                    text: "Xóa thành công!",
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
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Table dataSource={this.state.data}>
                <ColumnGroup title="Full Name">
                    <Column title="First Name" dataIndex="firstname" key="firstname" />
                    <Column title="Last Name" dataIndex="lastname" key="lastname" />
                </ColumnGroup>
                <Column title="Role" dataIndex="role" key="role" render = {role => {
                    let color = role==='quanly'?'red':'blue';
                    return (
                        <span>
                            <Tag color={color}>{role}</Tag>
                        </span>
                    )
                } }/>
            
                <Column title="Phone" dataIndex="phone" key="phone" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column
                    title="Action"
                    key="action"
                    dataIndex="key"
                    render={key => (
                        <span>
                            <Button type="link" >
                                {/* <Link to ={`/edit-user/${key}`} >Edit</Link> */}
                                <Link to={{
                                    pathname:'/edit-user',
                                    aboutProps:{
                                        id:`${key}`
                                    }
                                }}>Edit</Link>
                            </Button>
                            <Button type="link" danger onClick={()=>this.deleteUser(key)}>
                                Delete
                            </Button>
                        </span>
                    )}
                />
            </Table>
            </div>
            
            </Content>
        );
    }
}

export default UserTable;