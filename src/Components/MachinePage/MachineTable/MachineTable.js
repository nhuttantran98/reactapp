import React, { Component } from 'react';
import { Button, Layout, Breadcrumb, Avatar } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import {getAllMachines,deleteMachine} from '../../MachineFunction/MachineFunction';
import { Link, } from 'react-router-dom';
import swal from 'sweetalert';
import socketIOClient from 'socket.io-client';

const { Content } = Layout;

class MachineTable extends Component {

    constructor(props) {
        super(props);
        const endpoint = "192.168.2.19:2017";
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
        this.socket = socketIOClient(endpoint);
    }

    getAckServer = value => {
        console.log("Ack from server "+JSON.stringify(value));
        let result = value.map(({ id: key, ...rest }) => ({ key, ...rest }));
        this.setState({
            data: result
        })
        
        
    }
    
    async componentDidMount(){
        this.socket.on('server-send-ack-machineTable',this.getAckServer);
        const response = await getAllMachines();
        let myData = response;
        let result = myData.map(({ id: key, ...rest }) => ({ key, ...rest }));
        this.setState({
            data: result
        })
    }
    componentWillUnmount = () => {
        this.socket.close();
        console.log("socket close")
    }


    checkStatusMachine = key => {
        let rs = this.state.data.find(machine=>machine.key===key);

        if(rs.statusMachine===-1){
            swal({
                title: "Oppss...!",
                text: "Máy này chưa hoạt động!",
                icon: "error",
                button: "OK",
              });
        }else{
            this.props.history.push({
                pathname:'/all-machine/'+this.to_slug(rs.name),
                aboutProps:{name:`${rs.name}`}
            });

        }
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
    renderReady(){
        return  <Avatar size={130} icon={<AlertOutlined />} style={{ backgroundColor: '#ffff00' }}></Avatar>
    }
    showStatusMachine(status){
        if(status === 1) return this.renderOn();
        else if(status===0) return this.renderReady();
        else return this.renderOff();
    }
    detailMachine = (name) => {
        console.log(name)
    }
    to_slug = (str) => {
            // Chuyển hết sang chữ thường
            str = str.toLowerCase();     
        
            // xóa dấu
            str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
            str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
            str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
            str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
            str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
            str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
            str = str.replace(/(đ)/g, 'd');
        
            // Xóa ký tự đặc biệt
            str = str.replace(/([^0-9a-z-\s])/g, '');
        
            // Xóa khoảng trắng thay bằng ký tự -
            str = str.replace(/(\s+)/g, '-');
        
            // xóa phần dự - ở đầu
            str = str.replace(/^-+/g, '');
        
            // xóa phần dư - ở cuối
            str = str.replace(/-+$/g, '');
        
            // return
            return str;
    }
    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <Breadcrumb.Item></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: 'flex',flexWrap: 'wrap' }}>
                    {this.state.data.map((item)=>
                        <div key={item.key.toString()}  style={{backgroundColor: '#f1f1f1', width:'30%', margin:'22px', textAlign: 'center', lineHeight:'75px', fontSize:'30px'}}>
                        <Link to={{pathname:'/all-machine/'+this.to_slug(item.name),aboutProps:{name:`${item.name}`}}}><div style={{fontSize: "35px"}} >{item.name}</div></Link>
                        {this.showStatusMachine(item.statusMachine)}
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
                                <Button onClick={()=>this.checkStatusMachine(item.key)}>
                                    test
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