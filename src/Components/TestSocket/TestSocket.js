import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {Button} from 'antd';

class TestSocket extends Component {
    constructor(props) {
        super(props);
        const endpoint = "192.168.100.20:2017";
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
    componentDidMount(){
        this.socket.on('server-send-ack-machineTable',data=>{
            console.log(data)
        });
        this.socket.on('server-send-ack',data=>{
            console.log(data);
        })
    }
    onClickTest(){
        this.socket.emit('rasp-ready','abc123');
        
    }

    onClickSendData(){
        this.socket.emit('rasp-send-data',{machine:'abc123',temp:35.6,humid:98.6});
    }
    render() {
        return (
            <div>
                <Button  style={{ fontSize: '18px', height:'45px' }} onClick={()=>this.onClickTest()}>
                    Test
                </Button>
                <Button  style={{ fontSize: '18px', height:'45px' }} onClick={()=>this.onClickSendData()}>
                    Send Data
                </Button>
            </div>
        );
    }
}

export default TestSocket;