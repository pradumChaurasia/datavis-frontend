import React, { useEffect, useState, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

const MonthlyRepeatCustomers = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/order/getMonthlyRepeatCustomers');
        const data = response.data;

        data.sort((a,b)=>{
            const dateA = new Date(a._id.year, a._id.month - 1);
            const dateB = new Date(b._id.year, b._id.month - 1);
            return dateA - dateB;
        })
        const labels = data.map(item => `${item._id.month}/${item._id.year}`);
        const repeatCustomers = data.map(item => item.repeat_customers_count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Monthly Repeat Customers',
              data: repeatCustomers,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
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
      <h2 style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Monthly Repeat Customers</h2>
      <Bar 
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

export default MonthlyRepeatCustomers;
