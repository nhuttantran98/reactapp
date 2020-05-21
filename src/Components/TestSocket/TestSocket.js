import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {Button} from 'antd';

class TestSocket extends Component {
    intervalId=0;
    constructor(props) {
        super(props);
        const endpoint = "52.163.241.147:80";
        this.state = {
            clear:false,
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
        this.socket.on('server-get-data',data=>{
            this.intervalId = setInterval(() => {
                this.socket.emit('rasp-send-data',{machine:'abc123',temp:12,humid:15,idSetup:data.idSetup});
            }, 3000);
        })
        this.socket.on('server-get-data-complete',data=>{
            clearInterval(this.intervalId);
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
                <Button  style={{ fontSize: '18px', height:'45px' }} onClick={()=>this.onClickSendDataAuto()}>
                    Cancel Data Auto
                </Button>
            </div>
        );
    }
}

export default TestSocket;