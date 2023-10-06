import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
// import * as Plotly from './plotly.js/dist/plotly.js';

function VoteChart() {
  const [chartData, setChartData] = useState({});

  const fetchData = () => {
    fetch('http://localhost:5555/api/votes')
      .then((response) => response.json())
      .then((responseData) => {
        const { data, data1, labels, labels1 } = responseData;

        const presidentVotes = {
          marker: { color: 'rgba(75, 192, 192, 0.6)' },
          name: 'President Votes',
          type: 'bar',
          x: labels,
          y: data,
        };

        const vicePresidentVotes = {
          marker: { color: 'rgba(255, 99, 132, 0.6)' },
          name: 'Vice-President Votes',
          type: 'bar',
          x: labels1,
          y: data1,
        };

        const layout = {
          title: 'Vote Results',
          xaxis: { title: 'Candidates' },
          yaxis: { title: 'Votes' },
        };

        setChartData({ data: [presidentVotes, vicePresidentVotes], layout });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="vote-chart-container">
      <div className="vote-chart-plot">
        <Plot
          config={{ responsive: true }}
          data={chartData.data}
          layout={chartData.layout}
        />
      </div>
    </div>
  );
}

export default VoteChart;
