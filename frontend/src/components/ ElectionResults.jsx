import React, { useEffect, useState } from 'react';

function ElectionResults() {
  const [chartData, setChartData] = useState({
    data: [],
    data1: [],
    labels: [],
    labels1: [],
  });

  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:5000/vote/count');
      const result = await response.json();
      setChartData(result);

      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        data: {
          datasets: [
            {
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
              data: result.data,
              label: 'No of Votes',
            },
          ],
          labels: result.labels,
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

      const ctx1 = document.getElementById('myChart1').getContext('2d');
      const myChart1 = new Chart(ctx1, {
        data: {
          datasets: [
            {
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
              data: result.data1,
              label: 'No of Votes',
            },
          ],
          labels: result.labels1,
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
        className="mx-auto"
        id="myChart"
        style={{ maxHeight: '100px', maxWidth: '100px' }}
      />
      <br />
      <br />
      <h1 className="display-4 text-success">
        Vice-Presidential Election Results
      </h1>
      <canvas
        className="mx-auto"
        id="myChart1"
        style={{ maxHeight: '80px', maxWidth: '80px' }}
      />
    </div>
  );
}

export default ElectionResults;
