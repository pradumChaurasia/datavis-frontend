import React, { useEffect, useState, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerDistribution = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/api/customer/customer-distribution');
        const response = await axios.get('https://datavis-backend.vercel.app/api/customer/customer-distribution');
        const data = response.data;

        const labels = data.map(item => item._id);
        const counts = data.map(item => item.count);

        
        const generateColors = (numColors) => {
          const colors = [];
          for (let i = 0; i < numColors; i++) {
            const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
            colors.push(color);
          }
          return colors;
        };

        const backgroundColors = generateColors(data.length);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Customer Distribution by City',
              data: counts,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: backgroundColors
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Geographical Distribution of Customers</h2>
      <Pie 
        data={chartData} 
        options={{ 
          plugins: { 
            legend: { 
              labels: { 
                color: theme === 'dark' ? '#ffffff' : '#000000' 
              } 
            }
          }
        }} 
      />
    </div>
  );
};

export default CustomerDistribution;
