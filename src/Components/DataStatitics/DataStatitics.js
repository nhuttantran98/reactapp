import React, { Component } from 'react';
import {Layout, Breadcrumb, Table, Button, Tag} from 'antd';
import {getAllSetups, updateResult, getPDF} from './../MachineFunction/MachineFunction';
import swal from '@sweetalert/with-react'
const { Content } = Layout;
const { Column, ColumnGroup } = Table;
class DataStatitics extends Component {
    constructor(props) {
        super(props);
        this.state={data:[]
            // data:[{
            //         key:1,
            //         nameDevice: "COVID",
            //         mass: '50',
            //         typeOfFruit:'Banana',
            //         person:'Nam An',
            //         temp:'50',
            //         humid:'96',
            //         timeStart: new Date().toString().slice(0,24),
            //         timeStop: new Date().toString().slice(0,24),
                    
            //     }
        }
    }

    
    dataResult=[];

    generateReport = () => {
        getPDF();
    }

    async componentDidMount() {
        const myData = await getAllSetups();
        let result = myData.map(({id:key, ...rest})=>({key, ...rest}));
        this.setState({
            data:result
        })
    }

    handleOnRowClick = (record,index) => {
        if(record.user_email===localStorage.getItem('useremail')){
            swal("Đánh giá kết quả: GOOD, MEDIUM or BAD", {
                content: "input",
                icon: 'info'
            })
            .then((value) => {
                let dataUpdateResult = {id: record.key,result:value};
                this.dataResult.push(dataUpdateResult);
                this.setState(preState => {
                const newItems = [...preState.data];
                newItems[index].result=value;
                return {data: newItems};
            })
              });
        }else{
            swal({
                title: "Oppss...!",
                text: "Bạn không được cấp quyền đánh giá kết quả!",
                icon: "warning",
                button: "OK",
              });
        }
        
        
    }
    
    async componentWillUnmount(){
        for(const object of this.dataResult){
            // eslint-disable-next-line
            let res = await updateResult(object)

        }
    }
    
    
    render() {
        return (  
            
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <Breadcrumb.Item></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Table dataSource={this.state.data} onRow={(record,rowIndex)=>{
                        return {
                            onClick: ()=>{this.handleOnRowClick(record,rowIndex)}
                        }
                    }}>
                        <Column title="Name of Device" dataIndex='machine_name' key='machine_name'></Column>
                        <Column title="Mass" dataIndex='mass' key='mass'></Column>
                        <Column title='Fruit' dataIndex='typeOfFruit' key='typeOfFruit'></Column>
                        <ColumnGroup title='Set up'>
                            <Column title='°C' dataIndex='temperature' key='temperature' render ={temperature=>{
                                return (
                                    <span>
                                        <Tag color={'red'}>{temperature}</Tag>
                                    </span>
                                )
                            }}/>
                            <Column title='%' dataIndex='humidity' key='humidity' render ={humidity=>{
                                return (
                                    <span>
                                        <Tag color={'blue'}>{humidity}</Tag>
                                    </span>
                                )
                            }}/>
                        </ColumnGroup>
                        <Column title='Person in chagre' dataIndex='user_email' key='user_email'></Column>
                        <Column title='Time start' dataIndex='timeStart' key='timeStart'></Column>
                        <Column title='Time stop' dataIndex='timeFinish' key='timeFinish'></Column>
                        <Column title='Result' dataIndex='result' key='result' render={result=>{
                            let color = result === 'GOOD' ? 'green' : result === 'MEDIUM' ? 'yellow' : 'red'
                            return (
                                <span>
                                    <Tag color={color}>{result}</Tag>
                                </span>
                            )
                        }}></Column>
                    </Table>
                    <Button onClick={()=>{this.generateReport()}}>Generate Report</Button>
                </div>
                
            </Content>
        );
    }
}

export default DataStatitics;