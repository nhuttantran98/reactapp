import React, { Component } from 'react';
import { Table, Tag, Button, Layout, Breadcrumb } from 'antd';
import {getAllUsers} from './../../UserFunction/UserFunction';
import { Link, } from 'react-router-dom';
const { Column, ColumnGroup } = Table;
const { Content } = Layout;
// var data = [
//     {
//         key: '1',
//         firstName: 'John',
//         lastName: 'Brown',
//         role: 'Quản lý',
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer'],
//     },
//     {
//         key: '2',
//         firstName: 'Jim',
//         lastName: 'Green',
//         role: 'Quản lý',
//         address: 'London No. 1 Lake Park',
//         tags: ['loser'],
//     },
//     {
//         key: '3',
//         firstName: 'Joe',
//         lastName: 'Black',
//         role: 'Vận hành',
//         address: 'Sidney No. 1 Lake Park',
//         tags: ['cool', 'teacher'],
//     },
// ];



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
                            <Button type="link" danger>
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