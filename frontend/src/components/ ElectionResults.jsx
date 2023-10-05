import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';

function ElectionResults() {
  const [chartData, setChartData] = useState({
    data: [],
    data1: [],
    labels: [],
    labels1: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/vote/count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setChartData(result);

        // After fetching data, you can render your chart here
        renderChart(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // Function to render the chart
  const renderChart = (chartData) => {
    // Extract data and labels from chartData
    const { data, data1, labels, labels1 } = chartData;

    // Create a chart using Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      data: {
        datasets: [
          {
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize the colors
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data,
            label: 'Data Set 1',
          },
          {
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: data1,
            label: 'Data Set 2',
          },
        ],
        labels,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      type: 'bar', // You can use different chart types as needed
    });
  };

  return (
    <div>
      <h2>Election Results</h2>
      <div className="chart-container">
        <canvas height="200" id="myChart" width="400" />
        <div className="chart-container">
          <canvas height="200" id="myChart" width="400" />
        </div>
      </div>
    </div>
  );
}

export default ElectionResults;
