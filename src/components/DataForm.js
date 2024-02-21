import React, { useState } from 'react';
import '../styles/dataform.css'; // Import the CSS file

const DataForm = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(startDate, endDate);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Start Date (DD--MM-YYYY HH:MM)</label>
        <input className="form-input" type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">End Date (DD-MM-YYYY HH:MM)</label>
        <input className="form-input" type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <button className="form-button" type="submit">Submit</button>
    </form>
  );
};

export default DataForm;
