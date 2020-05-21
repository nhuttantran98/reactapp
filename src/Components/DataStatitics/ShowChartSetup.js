import React, { Component } from 'react';
import ChartMachine from '../Machine/ChartMachine/ChartMachine';
import ChartMachineBar from '../Machine/ChartMachineBar/ChartMachineBar';

import {getDataChartSetup} from '../MachineFunction/MachineFunction';
import {Row, Col} from 'antd';
class ShowChartSetup extends Component {
    constructor(props) {    
        super(props);  
        this.state={
            dataLineChart:[],
            dataBarChart:[],
        }
    }
    
    dataChart=[];
    dataChartBar=[];
    async componentDidMount(){
        let setup = {id:this.props.location.aboutProps.setupId,code:this.props.location.aboutProps.machine}
        let data = await getDataChartSetup(setup);
        data.forEach(element => {
            this.dataChart.push({x:element.created,y:element.temp})
        });
        console.log(data)
        this.setState({
            dataLineChart:this.dataChart
        })
    }
    render() {
        return (
            <div>
                <Row style={{margin: '15px'}}>
                    <Col span={12}>
                        <div style={{ minHeight: '400px', margin: '20px', background: 'white', borderRadius: '6px' }}>
                            <Row style={{ paddingTop: '20px' }}>
                                <ChartMachine data={this.state.dataLineChart}></ChartMachine>
                            </Row>
                            
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ minHeight: '400px', margin: '20px', background: 'white', borderRadius: '6px' }}>
                            <Row style={{ paddingTop: '20px' }}>
                                <ChartMachineBar data={this.state.dataLineChart}></ChartMachineBar>
                            </Row>
                            
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ShowChartSetup;