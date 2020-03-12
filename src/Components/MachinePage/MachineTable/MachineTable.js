import React, { Component } from 'react';
import { Table, Tag, Button, Layout, Breadcrumb, Avatar } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import {getAllMachines} from '../../MachineFunction/MachineFunction';
const { Column, ColumnGroup } = Table;
const { Content } = Layout;

class MachineTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[]
            // data:[
            //     {
            //         key:'1',
            //         position:'Nhà kho A',
            //         description: 'thuc tap sinh dieu khien',
            //         name:'COVID19',
            //         status: false
            //     },
            //     {
            //         key:'2',
            //         position:'Nhà kho B',
            //         description: 'Giam doc dieu khien',
            //         name:'CORONA',
            //         status: true
            //     },
            //     {
            //         key:'3',
            //         position:'Nhà kho B',
            //         description: 'Giam doc dieu khien',
            //         name:'CORONA',
            //         status: true
            //     },
            //     {
            //         key:'4',
            //         position:'Nhà kho B',
            //         description: 'Giam doc dieu khien',
            //         name:'CORONA',
            //         status: true
            //     }
            // ]
        }
    }
    
    async componentDidMount(){
        const response = await getAllMachines();
        let myData = response;
        let result = myData.map(({ id: key, ...rest }) => ({ key, ...rest }));
        this.setState({
            data: result
        })
    }

    renderOn(){
        return <Avatar size={130} icon={<AlertOutlined />} style={{ backgroundColor: '#87d068' }}></Avatar>
    }

    renderOff(){
        return  <Avatar size={130} icon={<AlertOutlined />} ></Avatar>
    }
    showStatusMachine(status){
        if(status === true) return this.renderOn();
        else return this.renderOff();
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

                        <div key={item.key.toString()}  style={{backgroundColor: '#f1f1f1', width:'30%', margin:'22px', textAlign: 'center', lineHeight:'75px', fontSize:'30px'}}>
                        <div style={{fontSize: "35px"}}>{item.name}</div>
                        {this.showStatusMachine(item.status)}
                        <div>{item.position}</div>
                        <div>
                                <Button type='link' style={{fontSize: '35px'}}>
                                    Edit
                                </Button>
                                <Button type='link' danger style={{fontSize: '35px'}}>
                                    Delete
                                </Button>
                            

                    </div>
                    </div>
                    
                    )}
                    
                </div>
            </Content>
        );
    }
}

export default MachineTable;