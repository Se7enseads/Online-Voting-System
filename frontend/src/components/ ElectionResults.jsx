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


     const backgroundColor1 = 'rgba(54, 162, 235, 0.6)';
     const borderColor1 = 'rgba(54, 162, 235, 1)';
     const backgroundColor2 = 'rgba(255, 99, 132, 0.6)';
     const borderColor2 = 'rgba(255, 99, 132, 1)';


    // Create a chart using Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      data: {
        datasets: [
          {
            backgroundColor: backgroundColor1,
            borderColor: borderColor1,
            borderWidth: 2,
            data,
            label: 'Data Set 1',
          },
          {
            backgroundColor: backgroundColor2,
            borderColor: borderColor2,
            borderWidth: 2,
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
      type: 'bar',
    });
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.2rem' }}>Election Results</h2>
      <div className="chart-container">
        <canvas height="150" width="300" id="myChart" />
        <div className="chart-container">
          <canvas height="150" width="300" id="myChart" />
        </div>
      </div>
    </div>
  );
}

export default ElectionResults;
