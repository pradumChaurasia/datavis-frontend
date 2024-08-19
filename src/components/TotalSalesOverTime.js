import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

const TotalSalesOverTime = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/order/total-sales-over-time');
        const data = response.data;

        const labels = data.map(item => `${item._id.month}/${item._id.year}`);
        const totalSales = data.map(item => item.total_sales);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Total Sales Over Time',
              data: totalSales,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2,
              fill: true,
              color: theme === 'dark' ? '#ffffff' : '#000000' 
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
  }, [theme]); 

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Total Sales Over Time</h2>
      <Line 
        data={chartData} 
        options={{ 
            plugins: {
            legend: {
              labels: {
                color: theme === 'dark' ? '#ffffff' : '#000000', 
              },
            },
          },
          scales: { 
            x: { 
              ticks: { 
                color: theme === 'dark' ? '#ffffff' : '#000000' 
              } 
            }, 
            y: { 
              ticks: { 
                color: theme === 'dark' ? '#ffffff' : '#000000' 
              } 
            } 
          } 
        }} 
      />
    </div>
  );
};

export default TotalSalesOverTime;
