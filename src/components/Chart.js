import React from 'react';
import Chart from 'react-apexcharts';
import '../styles/chart.css'; // Import the CSS file

const ChartComponent = ({ data, type }) => {
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

  const options = {
    chart: {
      type: 'line',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      }
    },
    xaxis: {
      type: 'datetime'
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
