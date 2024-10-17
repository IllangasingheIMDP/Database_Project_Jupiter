// src/pages/GenerateReports.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenerateReports = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your API endpoint to fetch employee leave data
    axios.get('/api/employee-leave-data')
      .then(response => {
        setLeaveData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leave data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Leave Report</h1>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Leave Count</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.leaveCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateReports;
