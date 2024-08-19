import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale
} from 'chart.js';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const NewCustomersOverTime = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/customer/new-customers-over-time');
                const data = response.data;

                const labels = data.map(item => `${item._id.month}/${item._id.year}`);
                const counts = data.map(item => item.count);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'New Customers Over Time',
                            data: counts,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
            <h2 style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>New Customers Over Time</h2>
            <Line data={chartData} options={{
                plugins: {
                    legend: {
                        labels: {
                            color: theme === 'dark' ? '#ffffff' : '#000000',
                        },
                    },
                },
                scales:
                {
                    x: { ticks: { color: theme === 'dark' ? '#ffffff' : '#000000' } },
                    y: { ticks: { color: theme === 'dark' ? '#ffffff' : '#000000' } }
                }
            }} />
        </div>
    );
};

export default NewCustomersOverTime;
