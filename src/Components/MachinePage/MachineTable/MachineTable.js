import React, { Component } from 'react';
import { Table, Tag, Button, Layout, Breadcrumb } from 'antd';
const { Column, ColumnGroup } = Table;
const { Content } = Layout;

class MachineTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                    key:'1',
                    position:'nha kho A',
                    description: 'thuc tap sinh dieu khien',
                    name:'COVID19',
                    status: false
                },
                {
                    key:'2',
                    position:'nha kho B',
                    description: 'Giam doc dieu khien',
                    name:'CORONA',
                    status: true
                },
                {
                    key:'3',
                    position:'nha kho B',
                    description: 'Giam doc dieu khien',
                    name:'CORONA',
                    status: true
                },
                {
                    key:'4',
                    position:'nha kho B',
                    description: 'Giam doc dieu khien',
                    name:'CORONA',
                    status: true
                }
            ]
        }
    }
    

    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: 'flex',flexWrap: 'wrap' }}>
                    {this.state.data.map((item)=>
                    <div key={item.key.toString()}  style={{backgroundColor: '#f1f1f1', width:'30%', margin:'22px', textAlign: 'center', lineHeight:'75px', fontSize:'30px'}}>{item.key}</div>

                    )}
                    {/* <div style={{backgroundColor: '#f1f1f1', width:'30%', margin:'22px', textAlign: 'center', lineHeight:'75px', fontSize:'30px'}}>abcd</div>
                    <div style={{backgroundColor: '#f1f1f1', width:'30%', margin:'22px', textAlign: 'center', lineHeight:'75px', fontSize:'30px'}}>abcd</div>
                    <div style={{backgroundColor: '#f1f1f1', width:'30%', margin:'22px', textAlign: 'center', lineHeight:'75px', fontSize:'30px'}}>abcd</div>
                    <div style={{backgroundColor: '#f1f1f1', width:'30%', margin:'22px', textAlign: 'center', lineHeight:'75px', fontSize:'30px'}}>abcd</div> */}
                </div>
            </Content>
        );
    }
}

export default MachineTable;