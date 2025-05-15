import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchTransactions } from '../api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendingChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const transactions = await fetchTransactions();

        const categoryMap = {};
        transactions.forEach((tx) => {
          const cat = tx.category || 'Uncategorized';
          categoryMap[cat] = (categoryMap[cat] || 0) + parseFloat(tx.amount);
        });

        const labels = Object.keys(categoryMap);
        const data = Object.values(categoryMap);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Spending by Category',
              data,
              backgroundColor: '#3498db',
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error('Error loading chart data:', err);
        setError('Failed to load chart');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading chart...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Spending Chart</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Spending by Category',
            },
          },
        }}
      />
    </div>
  );
};

export default SpendingChart;
