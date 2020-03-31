import React, { Component } from 'react';
import { Row, Col, Slider, Select, Button } from 'antd';
import ChartMachine from './ChartMachine/ChartMachine';
import ChartMachineBar from './ChartMachineBar/ChartMachineBar';

import './Machine.css';
import Device from './Device/Device';
import socketIOClient from 'socket.io-client';

const marksTemp = {
    50: '50°C',

    200: {
        style: {
            color: '#f50',
        },
        label: <strong>200°C</strong>,
    },
};
const marksHumid = {
    50: '50%',

    200: {
        style: {
            color: '#f50',
        },
        label: <strong>100%</strong>,
    },
};
const marksMass = {
    0: '0 Kg',
    50: '50 Kg',

    200: {
        style: {
            color: '#f50',
        },
        label: <strong>200Kg</strong>,
    },
};
const { Option } = Select;

class Machine extends Component {

    constructor(props) {
        super(props);
        const endpoint = "localhost:5555";
        this.state = {
            dataLineChart:[],
            dataControl:{
                tempValue: 100,
                humidValue: 100,
                massValue: 100,  	
                selectedFruit:'Banana'
            },
            typeOfFruit: [
                {
                    id: 1,
                    value: "Banana"
                }, {
                    id: 2,
                    value: "Orange"
                }, {
                    id: 3,
                    value: "Pine Apple"
                }, {
                    id: 4,
                    value: "Coconut"
                }
            ],
            dataDevice:[
                {
                    id: 1,
                    title: 'GIA NHIET 1',
                    status: true
                },
                {
                    id: 2,
                    title: 'GIA NHIET 2',
                    status: true
                },
                {
                    id: 3,
                    title: 'QUAT HUT',
                    status: true
                },
                {
                    id: 4,
                    title: 'QUAT THOI',
                    status: true
                }
            ]
        }
        this.socket = socketIOClient(endpoint);
        
    }
    dataChart=[];
    send = () => {
        console.log("Sent!!!!")
        this.socket.emit('client-send-control', this.state.dataDevice) 
    }
    getAckServer = value => {
        console.log("Ack from server "+JSON.stringify(value));
        this.setState({
            dataDevice: value
        })
    }
    getDataServer = value => {
        this.dataChart.push(value)
        if(this.dataChart.length > 15) this.dataChart.shift();
        console.log(this.dataChart);
        this.setState({
            dataLineChart:this.dataChart,
        })
    }
    componentDidMount = () => {
        this.socket.on('server-send-ack',this.getAckServer);
        this.socket.on('server-send-data',this.getDataServer)
    }
    componentWillUnmount = () => {
        this.socket.close();
        console.log("socket close")
    }
    onChangeTempValue = value => {
        this.setState({
            dataControl:{
                ...this.state.dataControl,
                tempValue: value
            }
        })
    }

    onChangeHumidValue = value => {
        this.setState({
            dataControl:{
                ...this.state.dataControl,
                humidValue: value
            }
        })
    }

    onChangeMassValue = value => {
        this.setState({
            dataControl:{
                ...this.state.dataControl,
                massValue: value
            }
        })
    }

    onClickSendConfig(){
        console.log(this.state)
        this.send();
    }

    onChangeSelect = value => {
        this.setState({
            dataControl:{
                ...this.state.dataControl,
                selectedFruit: value
            }
        })
    }

    changeStatus = (id,stt) => {
        this.setState(preState => {
            const newItems = [...preState.dataDevice];
            if(stt) newItems[id-1].status=false;
            else newItems[id-1].status=true;
            return {dataDevice: newItems};
        })
    }


    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <div style={{ minHeight: '400px', margin: '20px', background: 'white' }}>
                            <Row>
                                <ChartMachine data={this.state.dataLineChart}></ChartMachine>
                            </Row>
                            <Row>
                                <ChartMachineBar data={this.state.dataLineChart}></ChartMachineBar>
                            </Row>

                        </div>
                    </Col>
                    <Col span={12}>
                        
                        <div style={{ margin: '20px', background: 'white' }}>
                            <div style={{fontSize:'50px',textAlign:'center'}}>{this.props.location.aboutProps.name}</div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                            {this.state.dataDevice.map((item) =>
                                <div key={item.id} style={{width:'50%'}}>
                                    <Device status={item.status} id={item.id} changeStatus={this.changeStatus.bind(this)}>{item.title}</Device>
                                </div>
                            )}
                            </div>
                            
                        </div>

                        <div style={{ margin: '20px', background: 'white', padding: '20px' }}>
                            <h4 style={{fontSize:'25px'}}>Cài đặt thông số để khởi động máy sấy</h4>
                            <Slider marks={marksTemp} defaultValue={100} max={200} min={50} onChange={this.onChangeTempValue} tooltipVisible />
                            <Slider marks={marksHumid} defaultValue={100} max={200} min={50} onChange={this.onChangeHumidValue} tooltipVisible />
                            <Slider marks={marksMass} defaultValue={100} max={200} min={0} onChange={this.onChangeMassValue} tooltipVisible />
                            <Select defaultValue="Banana" style={{ width: 100, margin:'10px 0px' }} onChange={this.onChangeSelect}>
                                {this.state.typeOfFruit.map((item) =>
                                    <Option key={item.id} value={item.value}>{item.value}</Option>
                                )}
                            </Select>
                            <div>
                                <Button danger style={{ fontSize: '30px', height:'60px' }} onClick={()=>this.onClickSendConfig()}>
                                    START
                                </Button>
                                <Button danger style={{ fontSize: '30px', height:'60px' }} onClick={()=>this.send()}>
                                    SEND SOCKET
                                </Button>
                            </div>
                        </div>
                        
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Machine;