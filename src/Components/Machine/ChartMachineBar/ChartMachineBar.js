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
      type: 'bar',
      data: {
        datasets: [{
          label: 'Humidity',
          data: [],
          fill: false,
          lineTension: 0.2,
          borderColor: 'blue',
          borderWidth: 1,
        }]
      },
      options: {
        title: {
          text: 'Humidity Chart',
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
                max: 40
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