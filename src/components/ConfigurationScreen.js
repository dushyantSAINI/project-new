import React from 'react';
import '../styles/configurationscreen.css'; // Import the CSS file

const ConfigurationScreen = ({ graphType, setGraphType, alertWidgetEnabled, setAlertWidgetEnabled }) => {
  return (
    <div className="configuration-screen">
      <h2>Configuration</h2>
      <div className="form-group">
        <label>Graph Type:</label>
        <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
          <option value="line">Line Graph</option>
          <option value="bar">Stacked Bar Graph</option>
        </select>
      </div>
      <div className="form-group">
        <div>Enable alert widget :</div>
          <div><input type="checkbox" checked={alertWidgetEnabled} onChange={(e) => setAlertWidgetEnabled(e.target.checked)} />
       </div>
           
      </div>
    </div>
  );
};

export default ConfigurationScreen;
