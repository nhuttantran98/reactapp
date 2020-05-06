import React, { Component } from 'react';
import { Table, Tag, Layout, Breadcrumb } from 'antd';
import {getAllScripts} from './../MachineFunction/MachineFunction';
// import { Link, } from 'react-router-dom';
// import swal from 'sweetalert';

const { Column } = Table;
const { Content } = Layout;


class Script extends Component {

    constructor(props) {
        super(props);
        this.state = {data:[]};
            // key:1,
            // name:'Chuoi 30Kg',
            // useremail:'abc',
            // totalTime:30000,
            // script:'abc'
    }

    async componentDidMount(){
        let myData = await getAllScripts();
        let result = myData.map(({id:key, ...rest})=>({key, ...rest}));
        console.log(result)
        this.setState({
            data:result
        })
    }

    render() {

        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <Breadcrumb.Item></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Table dataSource={this.state.data}>
                    <Column title="Name of Script" dataIndex="name" key='name' />
                    <Column title="Total Time" dataIndex="totalTime" key='totalTime' render={totalTime=>{
                                let time = new Date(totalTime).toISOString().slice(11,19);
                        return (
                            
                            <span>
                                <Tag color={'blue'}>{time}</Tag>
                            </span>
                        )
                    }}/>
                
                    <Column title="Person in charge" dataIndex="useremail" key='username' />
                    <Column title="Script" dataIndex="script" key='script' />
                </Table>
            </div>
            
            </Content>
        );
    }
}

export default Script;