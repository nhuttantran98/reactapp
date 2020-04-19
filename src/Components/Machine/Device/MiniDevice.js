import React, { Component } from 'react';
import {Avatar } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
class MiniDevice extends Component {

    constructor(props){
        super(props);
        this.state = {
            status: this.props.status,
        };
    }
    isChange=true;
    lightStatus=this.props.status;

    renderOn(){
        return <Avatar size={100} icon={<AlertOutlined />} style={{ backgroundColor: '#87d068' }}></Avatar>
    }

    renderOff(){
        return  <Avatar size={100} icon={<AlertOutlined />} ></Avatar>
    }

    showStatus(){
        if(this.props.isChange===false){
            if(this.lightStatus === true) {
                return this.renderOn();
            }
            else {
                return this.renderOff();
            }
        }
        else{
            this.lightStatus=this.props.status;
            if(this.props.status === true) {
                return this.renderOn();
            }
            else {
                return this.renderOff();
            }
        }
    }


    render() {
        
        return (
            <div style={{background: '#ececec', padding:'40px 0px'}} >
                <div style={{width:'100%',display:'flex'}}>
                    <div style={{width:'100%',textAlign:'center',fontSize:'25px',fontFamily:'monospace',fontWeight:'bold'}} >{this.props.children}</div>
                </div>
                <div style={{textAlign:'center'}}>
                    {this.showStatus()} 
                </div>
            </div>
        );
    }
}

export default MiniDevice;