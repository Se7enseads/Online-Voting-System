import { useEffect, useState } from 'react';
import Plotly from 'react-plotly.js';

const VoteChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5555/api/votes')
      .then((response) => response.json())
      .then((responseData) => {
        const { labels, data, labels1, data1 } = responseData;

        const presidentVotes = {
          x: labels,
          y: data,
          type: 'bar',
          name: 'President Votes',
          marker: { color: 'rgba(75, 192, 192, 0.6)' },
        };

        const vicePresidentVotes = {
          x: labels1,
          y: data1,
          type: 'bar',
          name: 'Vice-President Votes',
          marker: { color: 'rgba(255, 99, 132, 0.6)' },
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

  return (
    <div className="vote-chart-container">
      <div className="vote-chart-plot">
        <Plotly
          data={chartData.data}
          layout={chartData.layout}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default VoteChart;
