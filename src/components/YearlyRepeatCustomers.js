import React, { useEffect, useState, useRef, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

const YearlyRepeatCustomers = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const { theme } = useContext(ThemeContext); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/api/order/getYearlyRepeatCustomers');
        const response = await axios.get('https://datavis-backend.vercel.app/api/order/getYearlyRepeatCustomers');
        let data = response.data;
        data = data.sort((a, b) => a._id - b._id);
        const labels = data.map(item => item._id.toString());
        const repeatCustomers = data.map(item => item.repeat_customers_count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Yearly Repeat Customers',
              data: repeatCustomers,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              color: theme === 'dark' ? '#ffffff' : '#000000', 
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

  useEffect(() => {
    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Yearly Repeat Customers</h2>
      {chartData && (
        <Bar
          ref={chartRef}
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
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                },
              },
              y: {
                ticks: {
                  color: theme === 'dark' ? '#ffffff' : '#000000', 
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default YearlyRepeatCustomers;
