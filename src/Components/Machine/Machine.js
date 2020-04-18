import React, { Component } from 'react';
import { Row, Col, Slider, Select, Button } from 'antd';
import ChartMachine from './ChartMachine/ChartMachine';
import ChartMachineBar from './ChartMachineBar/ChartMachineBar';
import {addSetup,getAllScripts} from './../MachineFunction/MachineFunction';

import swal from '@sweetalert/with-react'

import './Machine.css';
import Device from './Device/Device';
import MiniDevice from './Device/MiniDevice';
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
        this.countdownRef = React.createRef();
        const endpoint = "localhost:5555";
        this.state = {
            timeActive:false,
            timeFinish:0,
            isChooseScript: true,
            newScriptName:'',
            flagTime:false,
            standardTime:0,
            dataLineChart:[],
            dataControl:{
                tempValue: 100,
                humidValue: 100,
                massValue: 100,  	
                selectedFruit:'Banana'
            },
            dataNewScript:[],
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
            listScript:[],
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
    async componentDidMount(){
        this.socket.on('server-send-ack',this.getAckServer);
        this.socket.on('server-send-data',this.getDataServer);
        let allScripts = await getAllScripts();
        this.setState({
            listScript:allScripts
        })
        
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

    async send(){
        console.log("Sent!!!!"+JSON.stringify(this.state.dataDevice));
        this.socket.emit('client-send-control', this.state.dataDevice);
        let temp='';
        await this.state.dataDevice.forEach(e=>{
            temp=temp+Number(e.status);
        })
        if(this.state.flagTime===false){
            let obj={time:0,stt:temp}
            this.setState({
                flagTime:true,
                standardTime: Date.now(),
            })
            this.setState(prevState => ({
                dataNewScript: [...prevState.dataNewScript, obj]
            }))
        }else{
            let myTime = Date.now()-this.state.standardTime;
            let obj={time:myTime,stt:temp};
            this.setState(prevState => ({
                dataNewScript: [...prevState.dataNewScript, obj]
            }))
        }
    }

    finish(){
        let totalTime=0;
        this.state.dataNewScript.forEach(el=>{totalTime=totalTime+el.time})
        let obj =  {title:this.state.newScriptName,data:this.state.dataNewScript,totalTime:totalTime};
        console.log(obj)
    }

    onClickSendConfig(){
        const setup={
            user_email:localStorage.getItem('useremail'),
            machine_name: this.props.location.aboutProps.name,
            mass: this.state.dataControl.massValue,
            temperature:this.state.dataControl.tempValue,
            humidity:this.state.dataControl.humidValue,
            typeOfFruit:this.state.dataControl.selectedFruit,
            timeStart: new Date().toString().slice(0,24),
            timeFinish: new Date().toString().slice(0,24)
        }
        console.log("data setup " + JSON.stringify(setup))
        addSetup(setup).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    onClickStartScript = () => {
        this.setState({
            timeActive:true
        })
    }

    onChangeSelect = value => {
        this.setState({
            dataControl:{
                ...this.state.dataControl,
                selectedFruit: value
            }
        })
    }

    onChangeSelectScript = value => {
        this.setState({
            timeFinish:value,
            timeActive: false
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

    renderTimeActive(){
        let temp = new Date().getTime();
        let tempFinish = temp + this.state.timeFinish;
        let timeStart = new Date(temp);
        let timeFinish = new Date(tempFinish);
        
        if(this.state.timeActive===true){
            return <div>
                <h5 style={{fontSize:'20px'}}>Thời gian bắt đầu: {timeStart.toString().slice(16,24)}</h5>
                <h5 style={{fontSize:'20px'}}>Thời gian kết thúc dự kiến: {timeFinish.toString().slice(16,24)}</h5>
                </div>
        }
    }

    renderPeriod(){
        let time = new Date(this.state.timeFinish).toISOString().slice(11,19);
        return <h5 style={{fontSize:'20px'}}>Thời lượng sấy: {time}</h5>
    }
    renderCreateScript(){
        return <div style={{ margin: '20px', background: 'white' }}>
                    {/* <div style={{fontSize:'50px',textAlign:'center'}}>{this.props.location.aboutProps.name}</div> */}
                    <div style={{marginLeft: '35px'}}>
                        <Button  style={{ fontSize: '18px', height:'45px' }} onClick={()=>this.onClickCreateScript()}>
                            Chọn kịch bản
                        </Button>
                    </div>
                    <div style={{marginLeft: '35px'}}>
                        <div style={{display:'flex'}}>
                            <div style={{width:'50%'}}>
                                <h4 style={{fontSize:'25px'}}>
                                    Điều khiển máy sấy theo kịch bản 
            <span style={{textTransform: 'uppercase'}}>&nbsp; {this.state.newScriptName}</span>
                                </h4>
                            </div>
                            <div style={{width:'25%',textAlign:'center'}}>
                                <Button shape="circle" type="primary" style={{ fontSize: '25px', height:'85px', width:'85px',fontWeight:'bold' }} onClick={()=>this.send()}>
                                    SEND
                                </Button>
                            </div>
                            <div style={{width:'25%',fontSize:'45px'}}>
                                <Button danger  style={{ fontSize: '25px', height:'85px', width:'125px',fontWeight:'bold' }} onClick={()=>this.finish()}>
                                    FINISH
                                </Button>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                    {this.state.dataDevice.map((item) =>
                        <div key={item.id} style={{width:'50%'}}>
                            <Device status={item.status} id={item.id} changeStatus={this.changeStatus.bind(this)}>{item.title}</Device>
                        </div>
                    )}
                    </div>
                    
                </div>
    }

    renderChooseScript(){
        return <div style={{ margin: '20px', background: 'white' }}>
                    <div style={{fontSize:'50px',textAlign:'center'}}>
                    {/* {this.props.location.aboutProps.name} */}
                    </div>

                    <div style={{padding: '20px'}}>
                        <div style={{display:'flex'}}>
                            <div style={{width:'40%'}}>
                            <Button  style={{ fontSize: '18px', height:'45px' }} onClick={()=>this.onClickChooseScript()}>
                                Thiết lập kịch bản
                            </Button>
                            </div>
                            <div style={{width:'20%'}}>

                            </div>
                            <div style={{width:'40%'}}>
                                {this.renderPeriod()}
                            </div>

                        </div>
                        
                        <div style={{display:'flex'}}>
                            <div style={{width:'40%'}}>
                                <h4 style={{fontSize:'25px'}}>Chọn kịch bản sấy</h4>
                                <Select defaultValue="Hãy chọn kịch bản" style={{ width: 200, margin:'10px 0px' }} onChange={this.onChangeSelectScript}>
                                    {this.state.listScript.map((item) =>
                                        <Option key={item.name} value={item.totalTime}>{item.name}</Option>
                                    )}
                                </Select>
                            </div>
                            <div style={{width:'20%'}}>
                                <Button shape="circle" type="primary" style={{ fontSize: '25px', height:'85px', width:'85px',fontWeight:'bold' }} onClick={()=>this.onClickStartScript()}>
                                    START
                                </Button>
                            </div>
                            <div style={{width:'40%',fontSize:'45px'}} >
                                {this.renderTimeActive()}
                            </div>         
                        </div>
                        
                        <div style={{display:'flex',flexWrap:'wrap'}}>
                            {this.state.dataDevice.map((item) =>
                                <div key={item.id} style={{width:'25%'}}>
                                    <MiniDevice status={item.status} id={item.id} changeStatus={this.changeStatus.bind(this)}>{item.title}</MiniDevice>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    }

    onClickChooseScript(){
        swal("Nhập tên kịch bản mới", {
            content: "input",
            icon: 'info'
        })
        .then((value) => {
            console.log(value)
            if(value===''){
                return
            }
            this.setState({
                isChooseScript: false,
                newScriptName: value
            })
          });
        
    }

    onClickCreateScript(){
        this.setState({
            isChooseScript: true
        })
    }

    showSwitch(){
        if(this.state.isChooseScript===true){
            return this.renderChooseScript();
        }else{
            return this.renderCreateScript();
        }
    }


    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <div style={{ minHeight: '400px', margin: '20px', background: 'white' }}>
                            <Row style={{paddingTop:'20px'}}>
                                <ChartMachine data={this.state.dataLineChart}></ChartMachine>
                            </Row>
                            <Row style={{paddingTop:'20px'}}>
                                <ChartMachineBar data={this.state.dataLineChart}></ChartMachineBar>
                            </Row>

                        </div>
                    </Col>
                    <Col span={12}>
                        {this.showSwitch()}
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