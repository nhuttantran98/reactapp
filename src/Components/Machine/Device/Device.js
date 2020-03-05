import React, { Component } from 'react';
import {Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
class Device extends Component {

    constructor(props){
        super(props);
        this.state = {
            status: false
        };
    }

    changeStatus(){
        if(this.state.status===true){
            this.setState({status:false});
        }else{
            this.setState({status:true});
        }
    }

    renderOn(){
        return <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }}></Avatar>
    }

    renderOff(){
        return  <Avatar size={100} icon={<UserOutlined />} ></Avatar>
    }

    showStatus(){
        if(this.state.status === true) return this.renderOn();
        else return this.renderOff();
    }

    render() {
        return (
            <div style={{margin:'60px',background: '#ececec', padding:'10px 40px'}} onClick={()=>this.changeStatus(this.props.status)}>
                <div style={{textAlign:'center',fontSize:'25px',fontFamily:'monospace',fontWeight:'bold'}}>{this.props.children}</div>
                <div style={{textAlign:'center'}}>
                    {this.showStatus()} 
                </div>
            </div>
        );
    }
}

export default Device;