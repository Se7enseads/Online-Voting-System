import React, { useEffect, useState } from 'react';

function ElectionResults() {
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
    labels1: [],
    data1: [],
  });

  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:5000/vote/count');
      const result = await response.json();
      setChartData(result);

      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: result.labels,
          datasets: [
            {
              label: 'No of Votes',
              data: result.data,
              backgroundColor: [
                'rgba(85,107,47,0.2)',
                'rgba(124,252,0, 0.2)',
                'rgba(0,128,0, 0.2)',
                'rgba(144,238,144, 0.2)',
                'rgba(0,255,127, 0.2)',
                'rgba(240,230,140, 0.2)',
              ],
              borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      const ctx1 = document.getElementById('myChart1').getContext('2d');
      const myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: result.labels1,
          datasets: [
            {
              label: 'No of Votes',
              data: result.data1,
              backgroundColor: [
                'rgba(85,107,47,0.2)',
                'rgba(124,252,0, 0.2)',
                'rgba(0,128,0, 0.2)',
                'rgba(144,238,144, 0.2)',
                'rgba(0,255,127, 0.2)',
                'rgba(240,230,140, 0.2)',
              ],
              borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      myChart.update('none');
      myChart1.update('none');
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <h1 className="display-4 text-success">Presidential Election Results</h1>
      <canvas
        id="myChart"
        className="mx-auto"
        style={{ maxWidth: '100px', maxHeight: '100px' }}
      ></canvas>
      <br />
      <br />
      <h1 className="display-4 text-success">
        Vice-Presidential Election Results
      </h1>
      <canvas
        id="myChart1"
        className="mx-auto"
        style={{ maxWidth: '80px', maxHeight: '80px' }}
      ></canvas>
    </div>
  );
}

export default ElectionResults;
