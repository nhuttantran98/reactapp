import React, { Component } from 'react';
import {Avatar, Switch } from 'antd';
import { UserOutlined } from '@ant-design/icons';
class Device extends Component {

    constructor(props){
        super(props);
        this.state = {
            status: this.props.status,
        };
    }
    isChange=false;
    preStatus=this.props.status;

    renderOn(){
        return <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }}></Avatar>
    }

    renderOff(){
        return  <Avatar size={100} icon={<UserOutlined />} ></Avatar>
    }

    showStatus(){
        if(this.isChange===true){
            this.isChange=false;
            if(this.preStatus === true) {
                return this.renderOn();
            }
            else {
                return this.renderOff();
            }
        }
        else{
            this.preStatus=this.props.status;
            if(this.props.status === true) {
                return this.renderOn();
            }
            else {
                return this.renderOff();
            }
        }
    }

    

    changeIsChange = ()=>{
        this.isChange=!this.isChange
    }

    render() {
        
        return (
            <div style={{margin:'60px',background: '#ececec', padding:'20px 0px'}} >
                <div style={{width:'100%',display:'flex'}}>
                    <div style={{width:'20%'}}><Switch checked={this.props.status} onClick={()=> {this.props.changeStatus(this.props.id,this.props.status);this.changeIsChange()}}/></div>
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