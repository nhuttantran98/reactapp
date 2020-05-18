import React, { Component } from 'react';
import Chart from "chart.js";


class ChartMachine extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }
  componentDidUpdate() {
    
    this.myChart.data.datasets[0].data = this.props.data;
    this.myChart.update();
  }
  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Temperature',
          data: [],
          fill: false,
          lineTension: 0.2,
          borderColor: 'red',
          borderWidth: 1,
        }]
      },
      options: {
        title: {
          text: 'Temperature Chart',
          display: true
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
                unit: 'second',
                displayFormats:{
                  'second': 'h:mm:ss a'
                }
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true,
                max: 100
            }
        }]
        }
      }
    });
  }
  render() {

    return (
      <canvas ref={this.chartRef} />
    );
  }
}

export default ChartMachine;