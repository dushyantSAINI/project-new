// In ChartComponent.js

import React from 'react';
import Chart from 'react-apexcharts';
import '../styles/chart.css'; // Import the CSS file

const ChartComponent = ({ data, type, alerts }) => {
  if (!data || data.length === 0) {
    return <div className="chart-container">No data available</div>;
  }
  
  // Prepare data for ApexCharts
  const series = Object.keys(data[0]).slice(1).map(meter => ({
    name: meter,
    data: data.map(entry => {
      // Parse the timestamp and convert it to milliseconds since the Unix epoch in UTC timezone
      const [datePart, timePart] = entry.Timestamp.split(' ');
      const [day, month, year] = datePart.split('-');
      const [hours, minutes] = timePart.split(':');
      const timestamp = Date.UTC(year, month - 1, day, hours, minutes);
      return [timestamp, entry[meter]];
    })
  }));

  // Create annotations based on alerts
  const annotations =alerts.map((e)=>{
    return {
    y: e.value, // You need to provide the value where you want to place the annotation on the y-axis
    borderColor: '#ff0000', // You can adjust the color of the annotation border
    label: {
      borderColor: '#ff0000', // You can adjust the color of the annotation label border
      style: {
        color: '#fff',
        background: '#ff0000' // You can adjust the background color of the annotation label
      },
      text: e.message // Display the alert message as the annotation label
    }}
  }) 
   
  

  const options = {
    chart: {
      type: 'line',
      stacked: false,
      height: 350,
      width: 700,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      }
    },
    annotations: {
      yaxis: annotations // Add annotations to the y-axis
    },
    xaxis: {
      type: 'datetime'
    },
    dataLabels: {  // Add dataLabels property here
      enabled: false // Set enabled to false to disable data labels
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Chart options={options} series={series} type={type} height={350} />
      </div>
    </div>
  );
};

export default ChartComponent;
