import axios from "axios";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
const Process = () => {
  const [data, setData] = useState({});
  // const [cluster, setCluster] = useState({});
  // let count1 = 0;
  // let count0 = 0;
  // let count2 = 0;
  // let count3 = 0;
  ChartJS.register(ArcElement, Tooltip, Legend);
  const fetchData = async () => {
    const response = await axios.get(
      "http://127.0.0.1:5000/api/v1/data/process"
    );
    setData(response.data);
    console.log(response.data);
    // setCluster(response.data.rfm_statistics.Cluster);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Object.keys(cluster).map((key) => {
  //   if (cluster[key] == 0) {
  //     count0++;
  //   } else if (cluster[key] == 1) {
  //     count1++;
  //   } else if (cluster[key] == 2) {
  //     count2++;
  //   } else if (cluster[key] == 3) {
  //     count3++;
  //   }
  // });
  // const barData = {
  //   labels: ["Cluster 0 ", "Cluster 1", "Cluster 2", "Cluster 3"],
  //   datasets: [
  //     {
  //       label: "Clusters",
  //       data: [count0, count1, count2, count3],
  //       backgroundColor: ["red", "blue", "green", "yellow"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  return (
    <div className="bg-gradient-to-b from-[#b7f8db] to-[#50a7c2] h-screen flex flex-col  items-center justify-center text-white ">
      <div>No of segments : </div>
      <div>{/* <Doughnut data={barData} /> */}</div>
    </div>
  );
};

export default Process;
