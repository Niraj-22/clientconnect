// src/components/RFMCharts.js

import { Bar, Radar, Scatter } from "react-chartjs-2";

const RFMCharts = ({ data }) => {
  const { rfm_statistics, averages, clusters } = data;

  // Prepare data for the bar chart
  const barData = {
    labels: ["Recency", "Frequency", "Monetary"],
    datasets: [
      {
        label: "Averages",
        data: [
          averages.avg_recency,
          averages.avg_frequency,
          averages.avg_monetary,
        ],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the radar chart
  const radarData = {
    labels: ["Recency", "Frequency", "Monetary"],
    datasets: clusters.map((cluster, index) => {
      const clusterData = cluster.map(
        (entryIndex) => rfm_statistics[entryIndex]
      );
      const avgCluster = [
        clusterData.reduce((acc, entry) => acc + entry[0], 0) /
          clusterData.length,
        clusterData.reduce((acc, entry) => acc + entry[1], 0) /
          clusterData.length,
        clusterData.reduce((acc, entry) => acc + entry[2], 0) /
          clusterData.length,
      ];
      return {
        label: `Cluster ${index + 1}`,
        data: avgCluster,
        backgroundColor: `rgba(${75 + index * 40}, 192, 192, 0.4)`,
        borderColor: `rgba(${75 + index * 40}, 192, 192, 1)`,
        borderWidth: 1,
      };
    }),
  };

  // Prepare data for the scatter charts
  const scatterDataRecency = {
    datasets: clusters.map((cluster, index) => ({
      label: `Cluster ${index + 1}`,
      data: cluster.map((entryIndex) => ({
        x: index + 1,
        y: rfm_statistics[entryIndex][0],
      })),
      backgroundColor: `rgba(${75 + index * 40}, 192, 192, 0.4)`,
      borderColor: `rgba(${75 + index * 40}, 192, 192, 1)`,
    })),
  };

  const scatterDataFrequency = {
    datasets: clusters.map((cluster, index) => ({
      label: `Cluster ${index + 1}`,
      data: cluster.map((entryIndex) => ({
        x: index + 1,
        y: rfm_statistics[entryIndex][1],
      })),
      backgroundColor: `rgba(${75 + index * 40}, 192, 192, 0.4)`,
      borderColor: `rgba(${75 + index * 40}, 192, 192, 1)`,
    })),
  };

  const scatterDataMonetary = {
    datasets: clusters.map((cluster, index) => ({
      label: `Cluster ${index + 1}`,
      data: cluster.map((entryIndex) => ({
        x: index + 1,
        y: rfm_statistics[entryIndex][2],
      })),
      backgroundColor: `rgba(${75 + index * 40}, 192, 192, 0.4)`,
      borderColor: `rgba(${75 + index * 40}, 192, 192, 1)`,
    })),
  };

  return (
    <div>
      <h2>RFM Averages</h2>
      <Bar data={barData} />

      <h2>Cluster Analysis</h2>
      <Radar data={radarData} />

      <h2>Scatter Plots by Clusters</h2>
      <h3>Recency vs Clusters</h3>
      <Scatter data={scatterDataRecency} />
      <h3>Frequency vs Clusters</h3>
      <Scatter data={scatterDataFrequency} />
      <h3>Monetary vs Clusters</h3>
      <Scatter data={scatterDataMonetary} />
    </div>
  );
};

export default RFMCharts;
