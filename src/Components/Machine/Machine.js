import React, { Component } from 'react';
import { Row, Col, Slider, Select, Button } from 'antd';
import ChartMachine from './ChartMachine/ChartMachine';
import ChartMachineBar from './ChartMachineBar/ChartMachineBar';
import {addSetup,getAllScripts,addScript,getDataDevice} from './../MachineFunction/MachineFunction';

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
        const endpoint = "192.168.2.19:2017";
        this.state = {
            timeActive:false,
            timeStartActive:'',
            timeFinishActive:'',
            timeFinish:0,
            isChange:true, //To set change for device
            isDisabled:false, //To set chagne for sw
            isChooseScript: true, // To switch choose script and create script
            statusMachine:0,
            // nameOfChoosenScript:'',
            flagTime:false, //To get standard time
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
            choosenScript:'',
            nameOfChoosenScript:'',
            dataDevice:[
                // {
                //     id: 1,
                //     title: 'GIA NHIET 1',
                //     status: true
                // },
                // {
                //     id: 2,
                //     title: 'GIA NHIET 2',
                //     status: true
                // },
                // {
                //     id: 3,
                //     title: 'QUAT HUT',
                //     status: true
                // },
                // {
                //     id: 4,
                //     title: 'QUAT THOI',
                //     status: true
                // }
            ]
        }
        this.socket = socketIOClient(endpoint);
    }
    dataChart=[];
    

    getAckServer = value => {
        console.log("Ack from server "+JSON.stringify(value));
        if(this.props.location.aboutProps.name===value.machine){
            this.setState({
                dataDevice: value.data,
                isChange:true,
                statusMachine:value.stt,
                isDisabled:false
            })
        }
        
    }
    getDataServer = value => {
        this.dataChart.push(value)
        if(this.dataChart.length > 15) this.dataChart.shift();
        // console.log(this.dataChart);
        this.setState({
            dataLineChart:this.dataChart,
        })
    }
    async componentDidMount(){
        
        this.socket.on('server-send-ack',this.getAckServer);
        this.socket.on('server-send-data',this.getDataServer);
        let allScripts = await getAllScripts();
        let dataDevice = await getDataDevice(this.props.location.aboutProps.name)
        let data = dataDevice.dataDevice;
        let stt = dataDevice.statusMachine;
        this.setState({
            listScript:allScripts,
            dataDevice:data,
            statusMachine:stt
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
        this.socket.emit('client-send-control', {machine:this.props.location.aboutProps.name,stt:1,data: this.state.dataDevice});
        let temp='';
        await this.state.dataDevice.forEach(e=>{
            temp=temp+Number(e.status);
        })
        let tempTime = new Date().getTime();
        let timeStart = new Date(tempTime).toString();
        
        if(this.state.flagTime===false){
            let obj={time:0,stt:temp}
            this.setState({
                flagTime:true,
                standardTime: Date.now(),
                timeStartActive:timeStart,
                isDisabled:true
            })
            this.setState(prevState => ({
                dataNewScript: [...prevState.dataNewScript, obj],
            }))
            
        }else{
            let myTime = Date.now()-this.state.standardTime;
            let obj={time:myTime,stt:temp};
            this.setState(prevState => ({
                dataNewScript: [...prevState.dataNewScript, obj],
                standardTime:Date.now(),
                isDisabled:true
            }))
            

        }
        console.log(this.state.dataNewScript);
    }

    async finish(){
        let temp = new Date().getTime();
        let timeFinish = new Date(temp).toString();
        this.setState({
            isChange:false,
            flagTime:false,
            timeFinishActive:timeFinish,
            isDisabled:true
        })
        await this.setState(preState => {
            let newItems = [...preState.dataDevice];
            newItems.forEach(e=>{e.status=false});
            return {dataDevice: newItems};
        })
        
        
        // this.socket.emit('client-send-control', this.state.dataDevice);
        this.socket.emit('client-send-control', {machine:this.props.location.aboutProps.name,stt:0,data: this.state.dataDevice});
        
        let myTime = Date.now() - this.state.standardTime;
        let obj = {time: myTime,stt:'0000'}
        await this.setState(prevState => ({
            dataNewScript: [...prevState.dataNewScript, obj]
        }))
        
        let totalTime = 0;
        for(let i=0;i<this.state.dataNewScript.length;i++){
            totalTime=totalTime+this.state.dataNewScript[i].time
        }
        let scriptStr = JSON.stringify(this.state.dataNewScript)
        let resultForlistScript =  {name:this.state.nameOfChoosenScript,script:scriptStr,totalTime:totalTime};
        let resultForSubmit =  {name:this.state.nameOfChoosenScript,script:this.state.dataNewScript,totalTime:totalTime,useremail:localStorage.getItem('useremail')};

        await this.setState(prevState => ({
            listScript: [...prevState.listScript, resultForlistScript]
        }))
        console.log(this.state.listScript)
        addScript(resultForSubmit).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        this.onClickSendConfig();
        this.setState({
            dataNewScript:[],
        })
    }

    onClickSendConfig(){
        const setup={
            user_email:localStorage.getItem('useremail'),
            machine_name: this.props.location.aboutProps.name,
            mass: this.state.dataControl.massValue,
            script:this.state.nameOfChoosenScript,
            typeOfFruit:this.state.dataControl.selectedFruit,
            timeStart: this.state.timeStartActive.slice(0,24),
            timeFinish: this.state.timeFinishActive.slice(0,24)
        }
        console.log("data setup " + JSON.stringify(setup))
        addSetup(setup).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    waitFor = (sttStr,ms) => new Promise(r => {
        let sttArr = sttStr.split('')
        let deviceArr = this.state.dataDevice
        deviceArr.forEach((ele,idx)=>{
            ele.status = Boolean(Number(sttArr[idx]));
        })
        this.setState({
            dataDevice:deviceArr,
            isChange:false
        })
        // this.socket.emit('client-send-control', this.state.dataDevice);
        this.socket.emit('client-send-control', {machine:this.props.location.aboutProps.name,stt:1,data: this.state.dataDevice});

        console.log("sent!!!");
        setTimeout(r, ms)
    })
    asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array)
        }
    }

    start = async (arr) => {
        await this.asyncForEach(arr, async (element) => {
          await this.waitFor(element.stt,element.time)
        })
        await this.onClickSendConfig();
        await this.socket.emit('client-send-control-complete', {machine:this.props.location.aboutProps.name,stt:0,data: this.state.dataDevice});
        console.log('Done')
    }

    onClickStartScript () {
        
        let temp = new Date().getTime();
        let tempFinish = temp + this.state.timeFinish;
        let timeStart = new Date(temp).toString();
        let timeFinish = new Date(tempFinish).toString();
        this.setState({
            timeActive:true,
            timeStartActive:timeStart,
            timeFinishActive:timeFinish
        })
        let rs = JSON.parse(this.state.choosenScript);
        for (let index = 0; index < rs.length; index++) {
            if(index!==rs.length-1){
                rs[index].time=rs[index+1].time
            }else{rs[index].time=0}
        }
        console.log(this.state.choosenScript);
        this.start(rs);       
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
        let time = this.state.listScript[value].totalTime;
        let script = this.state.listScript[value].script;
        let name = this.state.listScript[value].name;
        console.log(script)
        this.setState({
            timeFinish:time,
            timeActive: false,
            choosenScript: script,
            nameOfChoosenScript: name
        })

    }

    changeStatus = (id,stt) => {
        this.setState(preState => {
            const newItems = [...preState.dataDevice];
            if(stt) newItems[id-1].status=false;
            else newItems[id-1].status=true;
            return {dataDevice: newItems};
        })
        this.setState({
            isChange:false
        })
    }

    

    renderTimeActive(){
        // let temp = new Date().getTime();
        // let tempFinish = temp + this.state.timeFinish;
        // let timeStart = new Date(temp);
        // let timeFinish = new Date(tempFinish);
        
        if(this.state.timeActive===true){
            return <div>
                <h5 style={{fontSize:'20px'}}>Thời gian bắt đầu: {this.state.timeStartActive.slice(16,24)}</h5>
                <h5 style={{fontSize:'20px'}}>Thời gian kết thúc dự kiến: {this.state.timeFinishActive.slice(16,24)}</h5>
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
            <span style={{textTransform: 'uppercase'}}>&nbsp; {this.state.nameOfChoosenScript}</span>
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
                            <Device isDisabled={this.state.isDisabled} isChange={this.state.isChange} status={item.status} id={item.id} changeStatus={this.changeStatus.bind(this)}>{item.title}</Device>
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
                                    {this.state.listScript.map((item,idx) =>
                                        <Option key={item.name} choosenScript={item.script} value={idx}>{item.name}</Option>
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
                                    <MiniDevice isChange={this.state.isChange} status={item.status} id={item.id} changeStatus={this.changeStatus.bind(this)}>{item.title}</MiniDevice>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    }

    onClickChooseScript(){
        if(this.state.statusMachine===1){
            swal({
                title: "Oppesss...!",
                text: "Khổng thể sử dụng chức năng này khi máy đang hoạt động!",
                icon: "warning",
                button: "OK",
              });
        }else{
            swal("Nhập tên kịch bản mới", {
                content: "input",
                icon: 'info'
            })
            .then((value) => {
                if(value===''){
                    return
                }
                this.setState({
                    isChooseScript: false,
                    nameOfChoosenScript: value
                })
              });
        }
        
        
    }

    onClickCreateScript(){
        if(this.state.statusMachine===1){
            swal({
                title: "Oppesss...!",
                text: "Khổng thể sử dụng chức năng này khi máy đang hoạt động!",
                icon: "warning",
                button: "OK",
              });
        }else{
            this.setState({
                isChooseScript: true
            })
        }
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