// In Dashboard.js

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
  const [alertWidgetEnabled, setAlertWidgetEnabled] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [leakageAlerts, setLeakageAlerts] = useState([]);
  const [alert,setSelectedAlert] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const csvData = Papa.parse(event.target.result, { header: true }).data;
        setData(csvData);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (startTime, endTime, selectedMeters) => {
    if (data) {
      const filtered = data.filter(entry => entry.Timestamp > startTime && entry.Timestamp < endTime);
      setFilteredData(filtered);
      calculateAlerts(filtered);
    }
  };

  const calculateAlerts = (data) => {
    data.forEach(entry => {
      // Sum the power values of M1, M2, and M3
      const totalPowerMeters = parseInt(entry["M1 Power (Watts)"]) + parseInt(entry["M2 Power (Watts)"]) + parseInt(entry["M3 Power (Watts)"]) + parseInt(entry["M4 Power Watts"]);
      // Check if the total power exceeds or is less than 1000 Watts
      if (totalPowerMeters > 1000) {
        setAlerts(prevAlerts => [...prevAlerts, { type: 'Total Power Exceeded', message: 'Total power consumption exceeded 1000 Watts', timestamp: entry.Timestamp, value: totalPowerMeters }]);
      }
    })

    data.forEach(entry => {
      const leakageCurrent = parseInt(entry['Cluster Meter Power (Watts)']) - (parseInt(entry['M1 Power (Watts)']) + parseInt(entry['M2 Power (Watts)']) + parseInt(entry['M3 Power (Watts)']) + parseInt(entry['M4 Power Watts']));
      if (leakageCurrent > 300) {
        setLeakageAlerts(prevAlerts => [...prevAlerts, { type: 'Leakage Current Exceeded', message: `Leakage current exceeded 300 Watts at : ${entry.Timestamp}`, value: leakageCurrent }]);
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
      <div className={`${alertWidgetEnabled?'alert-chart-container-grid':""}`}>
      <div className="chart-container">
        <Chart data={filteredData} type={graphType} alerts={alert} />
      </div>
      <div className={`${alertWidgetEnabled?'alert-widget':"d-none"}`}>
        
        {alertWidgetEnabled && <h2 className="alert-widget-title">Alerts</h2>}
        <div className='alert-container'>
        <div className='alert-widget-child-1'>
           {alertWidgetEnabled && alerts.map((alert, index) => (
            
            <div key={index} className="alert" onClick={()=>setSelectedAlert([{value:alert.value,message:alert.message}])} >
              <span className="alert-type">{alert.type}</span>
              <span className="alert-message">{alert.message}</span>
              <span className="alert-timestamp">{alert.timestamp}</span>
            </div>
          ))}
          </div>
          <div className='alert-widget-child-2'>

          {alertWidgetEnabled  && leakageAlerts.map((alert, index) => (
          <div key={index} className="alert" onClick={()=>setSelectedAlert([{value:alert.value,message:alert.message}])} >
            <span className="alert-type">{alert.type}</span>
            <span className="alert-message">{alert.message}</span>
            <span className="alert-timestamp">{alert.timestamp}</span>
          </div>
          ))}
          </div>
        </div>
        
        
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
