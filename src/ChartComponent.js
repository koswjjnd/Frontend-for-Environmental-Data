import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Button, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Checkbox, ListItemText } from '@material-ui/core';

function ChartComponent() {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('Bar');
  const [selectedMonths, setSelectedMonths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://110.41.190.111:5000/data');
        const formattedData = response.data.map(item => {
          const category = item[""];
          delete item[""];
          // Sort months
          const sortedData = Object.entries(item)
            .map(([key, value]) => ({ name: key, value: parseFloat(value) }))
            .sort((a, b) => new Date(a.name) - new Date(b.name)); // Sort by date
          return { category, data: sortedData };
        });
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, []);
  

  const renderChart = (entry) => {
    const filteredData = selectedMonths.length > 0 ? entry.data.filter(d => selectedMonths.includes(d.name)) : entry.data;
    switch (chartType) {
      case 'Line':
        return (
          <LineChart width={1400} height={400} data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        );
      case 'Pie':
        return (
          <PieChart width={400} height={300}>
            <Pie data={filteredData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
              {filteredData.map((_, index) => <Cell key={`cell-${index}`} fill={randomColor()} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      case 'Bar':
      default:
        return (
          <BarChart width={1400} height={300} data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
    }
  };

  const randomColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  };

  return (
    <div style={{ padding: 20, maxWidth: 1500, margin: "auto" }}>
      <FormControl variant="outlined" style={{ width: '100%', marginBottom: 20 }}>
        <InputLabel>Chart Type</InputLabel>
        <Select
          value={chartType}
          onChange={e => setChartType(e.target.value)}
          label="Chart Type"
        >
          <MenuItem value="Bar">Bar Chart</MenuItem>
          <MenuItem value="Line">Line Chart</MenuItem>
          <MenuItem value="Pie">Pie Chart</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ width: '100%', marginBottom: 20 }}>
        <InputLabel>Month</InputLabel>
        <Select
          multiple
          value={selectedMonths}
          onChange={e => setSelectedMonths(e.target.value)}
          input={<OutlinedInput label="Month" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {["Jan 2023", "Feb 2023", "March 2023", "April 2023", "May 2023", "June 2023",
            "July 2023", "August 2023", "September 2023", "October 2023", "November 2023", "December 2023"].map((month) => (
              <MenuItem key={month} value={month}>
                <Checkbox checked={selectedMonths.indexOf(month) > -1} />
                <ListItemText primary={month} />
              </MenuItem>
          ))}
        </Select>
      </FormControl>
      {data.map((entry, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <h2>{entry.category}</h2>
          {renderChart(entry)}
        </div>
      ))}
    </div>
  );
}

export default ChartComponent;
