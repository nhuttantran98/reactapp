import React, { Component } from 'react';
import { Button, Layout, Breadcrumb, Avatar } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import {getAllMachines,deleteMachine} from '../../MachineFunction/MachineFunction';
import { Link, } from 'react-router-dom';
import swal from 'sweetalert';
const { Content } = Layout;

class MachineTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[]
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

    deleteMachine = key=> {
        deleteMachine({id:key}).then(res=>{
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
                                    <Link to={{
                                        pathname:'/edit-machine',
                                        aboutProps:{
                                            id:`${item.key}`
                                        }
                                    }}>Edit</Link>
                                </Button>
                                <Button type='link' danger style={{fontSize: '35px'}} onClick={()=>this.deleteMachine(item.key)}>
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