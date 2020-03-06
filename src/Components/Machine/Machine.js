import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ChartMachine from './ChartMachine/ChartMachine';
import './Machine.css';
import Device from './Device/Device';

class Machine extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <div style={{minHeight:'400px', margin:'30px',background:'white'}}>
                            <Row>
                                <ChartMachine></ChartMachine>
                            </Row>
                            <Row>
                                <ChartMachine></ChartMachine>
                            </Row>

                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{margin:'30px',background:'white'}}>
                            <Row>
                                <Col span={12}>
                                    <Device status={true}>QUẠT HÚT</Device>
                                </Col>
                                <Col span={12}>
                                    <Device status={false}>GIA NHIỆT</Device>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Device status={false}>ĐÈN CHÍNH</Device>
                                </Col>
                                <Col span={12}>
                                    <Device status={true}>ĐÈN PHỤ</Device>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Machine;