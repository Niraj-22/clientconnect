import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "../../utils/axiosInstance";
import Joyride from "react-joyride";
import ScatterComponent from "../ScatterComponent";
const Process = () => {
  const [data, setData] = useState({});
  const steps = [
    {
      target: ".clusters",
      content: "This shows your segmented clusters",
    },
    {
      target: ".info",
      content: "This shows information about your data",
    },
    {
      target: ".rfm",
      content: "This shows RFM scores of your individual entries",
    },
  ];
  const [cluster, setCluster] = useState([]);
  let count_0,
    count_1,
    count_2 = 0;
  if (cluster.length > 1) {
    count_0 = cluster[0].length == 1 ? cluster[3].length : cluster[0].length;
    count_1 = cluster[1].length == 1 ? cluster[3].length : cluster[1].length;
    count_2 = cluster[2].length == 1 ? cluster[3].length : cluster[2].length;
  }
  ChartJS.register(ArcElement, Tooltip, Legend);
  const fetchData = async () => {
    const response = await axios.get("/data/process");
    setData(response.data);
    setCluster(response.data.clusters);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const barData = {
    labels: ["Cluster 0 ", "Cluster 1", "Cluster 2"],
    datasets: [
      {
        label: "Clusters",
        data: [count_0, count_1, count_2],
        backgroundColor: ["red", "blue", "orange"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="">
      <div className=" flex justify-around  bg-gradient-to-b from-[#b7f8db] to-[#50a7c2]  text-black ">
        <Joyride
          steps={steps}
          continuous={true}
          showSkipButton={true}
          styles={{
            tooltipContainer: {
              textAlign: "left",
            },
            buttonNext: {
              backgroundColor: "green",
            },
            buttonBack: {
              marginRight: 10,
            },
          }}
          locale={{
            last: "End tour",
            skip: "Close tour",
          }}
        />
        <div className="h-[45%] m-3 clusters">
          <Doughnut data={barData} />
        </div>
        <div className="mx-2 my-10 info">
          <table className="table-auto text-left  border border-slate-500">
            <thead>
              <tr>
                <th className="p-3 border border-slate-500">Data</th>
                <th className="p-3 border border-slate-500">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-500">No of Entries:</td>
                <td className="p-3 border border-slate-500">
                  {data.rfm_statistics ? data.rfm_statistics.length : 0}
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-500">No of segments:</td>
                <td className="p-3 border border-slate-500">
                  {cluster.length < 1 ? 0 : cluster.length - 1}
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-500">
                  Average Frequency Score:
                </td>
                <td className="p-3 border border-slate-500">
                  {data.averages && data.averages.avg_frequency}
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-500">
                  Average Monetary Score:
                </td>
                <td className="p-3 border border-slate-500">
                  {data.averages && Math.floor(data.averages.avg_monetary)}
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-500">
                  Average Recency Score:
                </td>
                <td className="p-3 border border-slate-500">
                  {data.averages && Math.floor(data.averages.avg_recency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-3 bg-slate-200 ">
        <ScatterComponent
          ClusterData={data.rfm_statistics ? data.rfm_statistics : []}
        />
        <div className="rfm"></div>
      </div>
    </div>
  );
};

export default Process;
