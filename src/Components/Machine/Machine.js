import React, { Component } from 'react';
import { Row, Col, Slider, Select, Button } from 'antd';
import ChartMachine from './ChartMachine/ChartMachine';
import ChartMachineBar from './ChartMachineBar/ChartMachineBar';
import { addSetup, getAllScripts, addScript, getDataDevice, updateTimeFinishSetup } from './../MachineFunction/MachineFunction';

import { RetweetOutlined } from '@ant-design/icons';
import swal from '@sweetalert/with-react'

import './Machine.css';
import Device from './Device/Device';
import MiniDevice from './Device/MiniDevice';
import socketIOClient from 'socket.io-client';

// const marksTemp = {
//     50: '50°C',

//     200: {
//         style: {
//             color: '#f50',
//         },
//         label: <strong>200°C</strong>,
//     },
// };
// const marksHumid = {
//     50: '50%',

//     200: {
//         style: {
//             color: '#f50',
//         },
//         label: <strong>100%</strong>,
//     },
// };
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
        const endpoint = "192.168.100.5:2017";
        this.state = {
            timeActive: false,       // Show Time Start / Time Finish or not
            timeStartActive: '',
            timeFinishActive: '',
            timeFinish: 0,            // Amount of time to Finish
            isChange: true,          //  To set change for device
            isDisabled: false,       //  To set change for Switch of device
            isChooseScript: true,   //  To switch choose script and create script
            statusMachine: 0,        //  Status of machine OFF READY ACTIVE
            flagTime: false,         //  To get standard time
            standardTime: 0,
            choosenScript: '',       //  Script Activity
            idSetup:'',             // Id of Setup which is submited!
            nameOfChoosenScript: '', //  Name of Script
            dataLineChart: [],
            dataControl: {
                tempValue: 100,
                humidValue: 100,
                massValue: 100,
                selectedFruit: 'Banana'
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
            dataNewScript: [],
            listScript: [],
            dataDevice: [
                // Data Sample:
                // {
                //     id: 1,
                //     title: 'GIA NHIET 1',
                //     status: true
                // }
            ]
        }
        this.socket = socketIOClient(endpoint);
    }

    dataChart = [];   // Temperable Array Data contain Data from Server

    getAckServer = value => {   //Function active when have event Socket.on('server-send-ack')
        console.log("Ack from server " + JSON.stringify(value));
        if (this.props.location.aboutProps.code === value.machine) {
            this.setState({
                dataDevice: value.data,     // Update status of 4 Device
                isChange: true,              // Device is change or not
                statusMachine: value.stt,    // Status of Machine
                isDisabled: false            // Can switch or not - To prevent Double CLick when Machine not received ACK from Server
            })
        }
        if(this.state.statusMachine===-1){
            swal({
                title: "Oppsss...!",
                text: "Máy sấy đã bị tắt!",
                icon: "error",
                button: "OK",
            });
        }
        
    }

    getDataServer = value => {  //Function active when have event Socket.on('server-send-data')
        if(this.props.location.aboutProps.code === value.machine){
            let dataSample = {
                x: value.time,
                y: value.temp
            }
            this.dataChart.push(dataSample)
            if (this.dataChart.length > 15) this.dataChart.shift();  // Delete 1 item in array when array > 15 item - To look chart better
            this.setState({
                dataLineChart: this.dataChart
            })
        }
        
    }

    async componentDidMount() {

        this.socket.on('server-send-ack', this.getAckServer);
        this.socket.on('server-send-data', this.getDataServer);

        let allScripts = await getAllScripts();
        let dataDevice = await getDataDevice(this.props.location.aboutProps.code)   // Result is all information of machine (name, position, code,...)
        let data = dataDevice.dataDevice;
        let stt = dataDevice.statusMachine;
        this.setState({
            listScript: allScripts,
            dataDevice: data,
            statusMachine: stt
        })
    }


    componentWillUnmount = () => {  // To close Socket when redirect to another page
        this.socket.close();
    }

    onChangeTempValue = value => { // To Update Temperature of dataControl
        this.setState({
            dataControl: {
                ...this.state.dataControl,
                tempValue: value
            }
        })
    }

    onChangeHumidValue = value => { // To Update Humidity of dataControl
        this.setState({
            dataControl: {
                ...this.state.dataControl,
                humidValue: value
            }
        })
    }

    onChangeMassValue = value => {  // To Update Humidity of dataControl
        this.setState({
            dataControl: {
                ...this.state.dataControl,
                massValue: value
            }
        })
    }

    async send() { // To Send control Device - use in Create Script

        // Send socket to Server
        this.socket.emit('client-send-control', { machine: this.props.location.aboutProps.code, stt: 1, data: this.state.dataDevice });

        let temp = ''; // To Contain stt to create Script. Ex: {1000}
        await this.state.dataDevice.forEach(e => {
            temp = temp + Number(e.status);
        })

        let tempTime = new Date().getTime();
        let timeStart = new Date(tempTime).toString();

        if (this.state.flagTime === false) {
            let obj = { time: 0, stt: temp }
            this.setState({
                flagTime: true,
                standardTime: Date.now(),   // Set standard Time again for subtraction in next Send()
                timeStartActive: timeStart,
                isDisabled: true
            })
            this.setState(prevState => ({
                dataNewScript: [...prevState.dataNewScript, obj],
            }))
            this.onClickSendConfigNotTimeFinish();

        } else {
            let myTime = Date.now() - this.state.standardTime;
            let obj = { time: myTime, stt: temp };
            this.setState(prevState => ({
                dataNewScript: [...prevState.dataNewScript, obj],
                standardTime: Date.now(),    // Set standard Time again for subtraction in next Send()
                isDisabled: true
            }))
        }
        console.log(this.state.dataNewScript);
    }

    async finish() {

        let temp = new Date().getTime();
        let timeFinish = new Date(temp).toString();
        this.setState({
            isChange: false,
            flagTime: false,
            timeFinishActive: timeFinish,
            isDisabled: true
        })

        // Auto set OFF for 4 Device
        await this.setState(preState => {
            let newItems = [...preState.dataDevice];
            newItems.forEach(e => { e.status = false });
            return { dataDevice: newItems };
        })

        this.socket.emit('client-send-control', { machine: this.props.location.aboutProps.code, stt: 0, data: this.state.dataDevice });

        let myTime = Date.now() - this.state.standardTime;
        let obj = { time: myTime, stt: '0000' }
        await this.setState(prevState => ({
            dataNewScript: [...prevState.dataNewScript, obj]
        }))

        let totalTime = 0;
        for (let i = 0; i < this.state.dataNewScript.length; i++) {
            totalTime = totalTime + this.state.dataNewScript[i].time
        }

        let scriptStr = JSON.stringify(this.state.dataNewScript)
        let resultForlistScript = { name: this.state.nameOfChoosenScript, script: scriptStr, totalTime: totalTime };
        // Add Username name to save in DB with newScript
        let resultForSubmit = { name: this.state.nameOfChoosenScript, script: this.state.dataNewScript, totalTime: totalTime, useremail: localStorage.getItem('useremail') };

        // Update newScript in listScript to show in Auto method
        await this.setState(prevState => ({
            listScript: [...prevState.listScript, resultForlistScript]
        }))

        // Update to Server newScript
        addScript(resultForSubmit).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

        // Update to Server the result when adding new script
        this.updateConfigTimeFinish();

        this.setState({
            dataNewScript: [],   // Delete dataNewScript for another create newScript
        })
    }

    // Send result to server

    // onClickSendConfig() {
    //     const setup = {
    //         user_email: localStorage.getItem('useremail'),
    //         machine_name: this.props.location.aboutProps.name,
    //         mass: this.state.dataControl.massValue,
    //         script: this.state.nameOfChoosenScript,
    //         typeOfFruit: this.state.dataControl.selectedFruit,
    //         timeStart: this.state.timeStartActive.slice(0, 24),
    //         timeFinish: this.state.timeFinishActive.slice(0, 24)
    //     }

    //     addSetup(setup).then(res => {
    //         console.log(res);

    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    updateConfigTimeFinish(){
        const setup = {
            id: this.state.idSetup,
            time:this.state.timeFinishActive.slice(0, 24)
        }

        updateTimeFinishSetup(setup).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        this.socket.emit('client-get-data-complete',{machine:this.props.location.aboutProps.code,idSetup:this.state.idSetup})
    }

    onClickSendConfigNotTimeFinish() {
        const setup = {
            user_email: localStorage.getItem('useremail'),
            machine_name: this.props.location.aboutProps.name,
            code: this.props.location.aboutProps.code,
            mass: this.state.dataControl.massValue,
            script: this.state.nameOfChoosenScript,
            typeOfFruit: this.state.dataControl.selectedFruit,
            timeStart: this.state.timeStartActive.slice(0, 24)
            // timeFinish: this.state.timeFinishActive.slice(0, 24)
        }

        addSetup(setup).then(res => {
            console.log(res)
            this.setState({
                idSetup:res.id
            })
            this.socket.emit('client-get-data',{machine:this.props.location.aboutProps.code,idSetup:res.id})
        }).catch(err => {
            console.log(err)
        })
    }

    // Send control to server in Auto method
    waitFor = (sttStr, ms) => new Promise(r => {
        let sttArr = sttStr.split('')
        let deviceArr = this.state.dataDevice
        deviceArr.forEach((ele, idx) => {
            ele.status = Boolean(Number(sttArr[idx]));
        })
        this.setState({
            dataDevice: deviceArr,
            isChange: false
        })
        this.socket.emit('client-send-control', { machine: this.props.location.aboutProps.code, stt: 1, data: this.state.dataDevice });

        console.log("sent!!!");
        setTimeout(r, ms)
    })

    // Create asyn FOR loop
    asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            if (this.state.statusMachine === -1) {
                
                break;
            }
            await callback(array[index], index, array)
        }
    }

    // Function implement the Script in Auto method
    start = async (arr) => {
        await this.asyncForEach(arr, async (element) => {
            await this.waitFor(element.stt, element.time)
        })
        await this.updateConfigTimeFinish();
        if (this.state.statusMachine !== -1) {
            await this.socket.emit('client-send-control-complete', { machine: this.props.location.aboutProps.code, stt: 0, data: this.state.dataDevice });
        }
    }

    // Start Auto Method
    async onClickStartScript() {
        if (this.state.choosenScript) {
            let temp = new Date().getTime();
            let tempFinish = temp + this.state.timeFinish;
            let timeStart = new Date(temp).toString();
            let timeFinish = new Date(tempFinish).toString();
            await this.setState({
                timeActive: true,
                timeStartActive: timeStart,
                timeFinishActive: timeFinish
            })
            this.onClickSendConfigNotTimeFinish();
            let rs = JSON.parse(this.state.choosenScript); //convert to array
            for (let index = 0; index < rs.length; index++) {
                if (index !== rs.length - 1) {
                    rs[index].time = rs[index + 1].time
                } else { rs[index].time = 0 }
            }
            console.log(this.state.choosenScript);
            this.start(rs);
        }
        else {
            swal({
                title: "Oppesss...!",
                text: "Bạn chưa chọn kịch bản!",
                icon: "warning",
                button: "OK",
            });
        }

    }

    // Select Fruit type
    onChangeSelect = value => {
        this.setState({
            dataControl: {
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
            timeFinish: time,
            timeActive: false,
            choosenScript: script,
            nameOfChoosenScript: name
        })

    }

    changeStatus = (id, stt) => {
        this.setState(preState => {
            const newItems = [...preState.dataDevice];
            if (stt) newItems[id - 1].status = false;
            else newItems[id - 1].status = true;
            return { dataDevice: newItems };
        })
        this.setState({
            isChange: false
        })
    }

    renderTimeActive() {
        if (this.state.timeActive === true) {
            return <div>
                <h5 style={{ fontSize: '20px' }}>Thời gian bắt đầu: {this.state.timeStartActive.slice(16, 24)}</h5>
                <h5 style={{ fontSize: '20px' }}>Thời gian kết thúc dự kiến: {this.state.timeFinishActive.slice(16, 24)}</h5>
            </div>
        }
    }

    renderPeriod() {
        let time = new Date(this.state.timeFinish).toISOString().slice(11, 19);
        return <h5 style={{ fontSize: '20px' }}>Thời lượng sấy: {time}</h5>
    }

    renderCreateScript() {
        return <div style={{ margin: '20px', background: 'white', borderRadius: '6px' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ fontSize: '50px', textAlign: 'center', width: '85%' }}>{this.props.location.aboutProps.name}</div>
                <div style={{ width: '15%', margin: '15px' }} onClick={() => this.onClickCreateScript()}>
                    <RetweetOutlined id='sw-method1' style={{ fontSize: '45px', border: '1px #D7EEF1 solid', width: '80px', borderRadius: '10px', backgroundColor: '#F1F8F9' }} />
                </div>
            </div>
            <div style={{ margin: '10px', background: 'white', padding: '0px 20px', borderRadius: '6px' }}>

            <h4 style={{ fontSize: '25px' }}>Chọn thông số để khởi động máy sấy</h4>
            <Slider marks={marksMass} defaultValue={100} max={200} min={0} onChange={this.onChangeMassValue} />
            <Select defaultValue="Banana" style={{ width: 200, margin: '10px 0px',fontSize: '22px' }} onChange={this.onChangeSelect}>
                {this.state.typeOfFruit.map((item) =>
                    <Option style={{ height: '35px' }} key={item.id} value={item.value}>{item.value}</Option>
                )}
            </Select>
            </div>
            <div style={{ backgroundColor: '#f0f2f5', height: '25px' }}></div>
            <div style={{ marginLeft: '35px' }}>
                <div style={{ display: 'flex',paddingTop:'20px' }}>
                    <div style={{ width: '50%' }}>
                        <h4 style={{ fontSize: '25px' }}>
                            Điều khiển máy sấy theo kịch bản
            <span style={{ textTransform: 'uppercase' }}>&nbsp; {this.state.nameOfChoosenScript}</span>
                        </h4>
                    </div>
                    <div style={{ width: '25%', textAlign: 'center' }}>
                        <Button id='btnSend' shape="circle" style={{ fontSize: '25px', height: '85px', width: '85px', fontWeight: 'bold',border: '1px #D7EEF1 solid', backgroundColor: '#F1F8F9' }} onClick={() => this.send()}>
                            SEND
                                </Button>
                    </div>
                    <div style={{ width: '25%', fontSize: '45px' }}>
                        <Button id='btnFinish' style={{borderRadius:'6px', fontSize: '25px', height: '85px', width: '125px', fontWeight: 'bold',border: '1px #FFD3D3 solid', backgroundColor: '#FFE8E8' }} onClick={() => this.finish()}>
                            FINISH
                                </Button>
                    </div>
                </div>

            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {this.state.dataDevice.map((item) =>
                    <div key={item.id} style={{ width: '50%' }}>
                        <Device isDisabled={this.state.isDisabled} isChange={this.state.isChange} status={item.status} id={item.id} changeStatus={this.changeStatus.bind(this)}>{item.title}</Device>
                    </div>
                )}
            </div>

        </div>
    }

    renderChooseScript() {
        return <div style={{ margin: '20px', background: 'white', borderRadius: '6px' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ fontSize: '50px', textAlign: 'center', width: '85%' }}>{this.props.location.aboutProps.name}</div>
                <div style={{ width: '15%', margin: '15px' }} onClick={() => this.onClickChooseScript()}>
                    <RetweetOutlined id='sw-method2' style={{ fontSize: '45px', border: '1px #D7EEF1 solid', width: '80px', borderRadius: '10px', backgroundColor: '#F1F8F9' }} />
                </div>
            </div>
            <div style={{ margin: '10px', background: 'white', padding: '0px 20px', borderRadius: '6px' }}>

                <h4 style={{ fontSize: '25px' }}>Chọn thông số để khởi động máy sấy</h4>
                {/* <Slider marks={marksTemp} defaultValue={100} max={200} min={50} onChange={this.onChangeTempValue}  />
                    <Slider marks={marksHumid} defaultValue={100} max={200} min={50} onChange={this.onChangeHumidValue}  /> */}
                <Slider marks={marksMass} defaultValue={100} max={200} min={0} onChange={this.onChangeMassValue} />
                <Select defaultValue="Banana" style={{ width: '200px', margin: '10px 0px', fontSize: '22px' }} onChange={this.onChangeSelect}>
                    {this.state.typeOfFruit.map((item) =>
                        <Option style={{ height: '35px' }} key={item.id} value={item.value}>{item.value}</Option>
                    )}
                </Select>
            </div>
            <div style={{ padding: '0px 20px', margin: '10px' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '40%' }}>

                    </div>
                    <div style={{ width: '20%' }}>

                    </div>
                    <div style={{ width: '40%' }}>
                        {/* {this.renderPeriod()} */}
                    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ width: '40%' }}>
                        <h4 style={{ fontSize: '25px' }}>Chọn kịch bản sấy</h4>
                        <Select defaultValue="Hãy chọn kịch bản" style={{ width: 200, margin: '10px 0px', fontSize: '17px' }} onChange={this.onChangeSelectScript}>
                            {this.state.listScript.map((item, idx) =>
                                <Option key={item.name} choosenScript={item.script} value={idx}>{item.name}</Option>
                            )}
                        </Select>
                    </div>
                    {/* <div style={{width:'20%'}}>
                                <Button shape="circle" type="primary" style={{ fontSize: '25px', height:'85px', width:'85px',fontWeight:'bold' }} onClick={()=>this.onClickStartScript()}>
                                    START
                                </Button>
                            </div> */}
                    <div style={{ width: '60%', fontSize: '45px' }} >
                        {this.renderPeriod()}
                        {this.renderTimeActive()}
                    </div>
                </div>

            </div>
            <div style={{ backgroundColor: '#f0f2f5', height: '25px' }}></div>
            <div style={{ textAlign: 'center', margin: '20px', background: 'white', borderRadius: '6px' }}>
                <h4 style={{ fontSize: '25px' }}>Bảng điều khiển</h4>
                <Button id='btnStart' shape="circle" style={{ fontSize: '25px', height: '85px', width: '85px', fontWeight: 'bold', border: '1px #D7EEF1 solid', backgroundColor: '#F1F8F9' }} onClick={() => this.onClickStartScript()}>
                    START
                        </Button>
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: '25px 15px' }}>
                    {this.state.dataDevice.map((item) =>
                        <div key={item.id} style={{ width: '25%' }}>
                            <MiniDevice isChange={this.state.isChange} status={item.status} id={item.id} changeStatus={this.changeStatus.bind(this)}>{item.title}</MiniDevice>
                        </div>
                    )}
                </div>
            </div>
        </div>
    }

    onClickChooseScript() {
        if (this.state.statusMachine === 1) {
            swal({
                title: "Oppesss...!",
                text: "Khổng thể sử dụng chức năng này khi máy đang hoạt động!",
                icon: "warning",
                button: "OK",
            });
        } else {
            swal("Nhập tên kịch bản mới", {
                content: "input",
                icon: 'info'
            })
                .then((value) => {
                    if (value === '') {
                        return
                    }
                    this.setState({
                        isChooseScript: false,
                        nameOfChoosenScript: value
                    })
                });
        }
    }

    onClickCreateScript() {
        if (this.state.statusMachine === 1) {
            swal({
                title: "Oppesss...!",
                text: "Khổng thể sử dụng chức năng này khi máy đang hoạt động!",
                icon: "warning",
                button: "OK",
            });
        } else {
            this.setState({
                isChooseScript: true
            })
        }
    }

    showSwitch() {
        if (this.state.isChooseScript === true) {
            return this.renderChooseScript();
        } else {
            return this.renderCreateScript();
        }
    }


    render() {
        return (
            <div>
                <Row style={{ margin: '15px' }}>
                    <Col span={12}>
                        <div style={{ minHeight: '400px', margin: '20px', background: 'white', borderRadius: '6px' }}>
                            <Row style={{ paddingTop: '20px' }}>
                                <ChartMachine data={this.state.dataLineChart}></ChartMachine>
                            </Row>
                            <Row style={{ paddingTop: '20px' }}>
                                <ChartMachineBar data={this.state.dataLineChart}></ChartMachineBar>
                            </Row>

                        </div>
                    </Col>
                    <Col span={12}>
                        {this.showSwitch()}
                        {/* <div style={{ margin: '20px', background: 'white', padding: '20px',borderRadius:'6px' }}>
                            
                            <h4 style={{fontSize:'25px'}}>Cài đặt thông số để khởi động máy sấy</h4>
                            <Slider marks={marksTemp} defaultValue={100} max={200} min={50} onChange={this.onChangeTempValue}  />
                            <Slider marks={marksHumid} defaultValue={100} max={200} min={50} onChange={this.onChangeHumidValue}  />
                            <Slider marks={marksMass} defaultValue={100} max={200} min={0} onChange={this.onChangeMassValue}  />
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
                        </div> */}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Machine;