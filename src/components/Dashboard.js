import React, { useState } from 'react';
import Chart from './Chart';
import DataForm from './DataForm';
import ConfigurationScreen from './ConfigurationScreen';
import Papa from 'papaparse';
import '../styles/dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [graphType, setGraphType] = useState('line');
  const [alertWidgetEnabled, setAlertWidgetEnabled] = useState(true);
  const [alerts, setAlerts] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const csvData = Papa.parse(event.target.result, { header: true }).data;
        setData(csvData);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (startTime, endTime, selectedMeters) => {
    if (data) {
      const filtered = data.filter(entry => entry.Timestamp > startTime && entry.Timestamp < endTime );
      setFilteredData(filtered);
      calculateAlerts(filtered);
    }
  };
console.log("data",data[0])
  const calculateAlerts = (data) => {
    data.forEach(entry => {
      // Sum the power values of M1, M2, and M3
      const totalPowerMeters = parseInt(entry["M1 Power (Watts)"]) + parseInt(entry["M2 Power (Watts)"]) + parseInt(entry["M3 Power (Watts)"]);
  
      // Check if the total power exceeds or is less than 1000 Watts
      if (totalPowerMeters > 1000) {
        setAlerts(prevAlerts => [...prevAlerts, { type: 'Total Power Exceeded', message: 'Total power consumption exceeded 1000 Watts', timestamp: entry.Timestamp }]);}})
  
    data.forEach(entry => {
      const leakageCurrent = entry['Cluster Meter Power (Watts)'] - (entry['M1 Power (Watts)'] + entry['M2 Power (Watts)'] + entry['M3 Power (Watts)'] + entry['M4 Power Watts']);
      if (leakageCurrent > 100) {
        setAlerts(prevAlerts => [...prevAlerts, { type: 'Leakage Current Exceeded', message: `Leakage current exceeded 300 Watts at timestamp: ${entry.Timestamp}`, timestamp: entry.Timestamp }]);
      }
    });
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Electricity Metering Data Visualization</h1>
      <div className="configuration-container">
        <ConfigurationScreen graphType={graphType} setGraphType={setGraphType} alertWidgetEnabled={alertWidgetEnabled} setAlertWidgetEnabled={setAlertWidgetEnabled} />
      </div>
      <div className='form-group-input'>
        <input className="file-input" type="file" onChange={handleFileChange} accept=".csv" />
      </div>
     
      <DataForm className="data-form" onSubmit={handleSubmit} />
     
      <div className="chart-container">
        <Chart data={filteredData} type={graphType} alertWidgetEnabled={alertWidgetEnabled} />
      </div>
      <div className="alert-widget">
        <h2 className="alert-widget-title">Alerts</h2>
        {alertWidgetEnabled && alerts.map((alert, index) => (
          <div key={index} className="alert" >
            <span className="alert-type">{alert.type}</span>
            <span className="alert-message">{alert.message}</span>
            <span className="alert-timestamp">{alert.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
