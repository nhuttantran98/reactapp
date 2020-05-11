import React, { Component } from 'react';
import {Avatar, Switch } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
class Device extends Component {

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
            <div style={{margin:'35px',background: '#ececec', padding:'40px 0px'}} >
                <div style={{width:'100%',display:'flex'}}>
                    <div style={{width:'20%'}}><Switch disabled={this.props.isDisabled} checked={this.props.status} onClick={()=> {this.props.changeStatus(this.props.id,this.props.status)}}/></div>
                    <div style={{width:'60%',textAlign:'center',fontSize:'25px',fontFamily:'monospace',fontWeight:'bold'}} >{this.props.children}</div>
                    <div style={{width:'20%'}}></div>
                </div>
                <div style={{textAlign:'center'}}>
                    {this.showStatus()} 
                </div>
            </div>
        );
    }
}

export default Device;