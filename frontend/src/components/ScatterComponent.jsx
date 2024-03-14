import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ScatterComponent = ({ ClusterData = [] }) => {
  const [sliceIndex, setSliceIndex] = useState(0); // Initialize slice index state

  const handlePrevClick = () => {
    if (sliceIndex > 0) {
      setSliceIndex(sliceIndex - 10); // Decrement slice index by 10 for previous button
    }
  };

  const handleNextClick = () => {
    if (sliceIndex + 10 < ClusterData.length) {
      setSliceIndex(sliceIndex + 10); // Increment slice index by 10 for next button
    }
  };

  const cData = ClusterData.slice(sliceIndex, sliceIndex + 10); // Slice data based on slice index
  const options = {
    plugins: {
      title: {
        display: true,
        text: "RFM Analysis",
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const labels = cData.map((_, index) => index + sliceIndex + 1); // Adjust labels based on slice index
  const data = {
    labels,
    datasets: [
      {
        label: "Recency",
        data: cData.map((item) => item[0]),
        backgroundColor: "red",
        stack: "Stack 0",
      },
      {
        label: "Frequency",
        data: cData.map((item) => item[1]),
        backgroundColor: "blue",
        stack: "Stack 0",
      },
      {
        label: "Monetary",
        data: cData.map((item) => item[2]),
        backgroundColor: "orange",
        stack: "Stack 1",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
      <div className="flex justify-around">
        <button
          type="button"
          onClick={handlePrevClick}
          className="border border-blue-600 bg-white text-black hover:bg-blue-400 hover:text-white p-4 rounded-xl"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="border border-blue-600 bg-white text-black hover:bg-blue-400 hover:text-white p-4 rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ScatterComponent;
