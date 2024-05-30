import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "../../utils/axiosInstance";
import Joyride from "react-joyride";
import ScatterComponent from "../ScatterComponent";
import RFMCharts from "../RFMCharts";
import Loader from "./Loader";
const Process = () => {
  const [data, setData] = useState({});
  const steps = [
    {
      target: ".intro",
      content: "This are the definitions of RFM ",
    },
    {
      target: ".clusters",
      content: "This shows your segmented clusters",
    },
    {
      target: ".info",
      content: "This shows information about your data",
    },
    {
      target: ".best",
      content: "This are the RFM scores of the best and worst customers",
    },
    { target: ".charts", content: "This are the plots based on the clusters" },
    {
      target: ".rfm",
      content: `This shows RFM scores of your individual entries where -
         R stand for Recency ,
         F stands for Frequency ,
         M stands for Monetary`,
    },
  ];
  const [cluster, setCluster] = useState([]);
  let count_0,
    count_1,
    count_2,
    count_3 = 0;
  if (cluster.length > 1) {
    count_0 = cluster[0].length == 1 ? cluster[3].length : cluster[0].length;
    count_1 = cluster[1].length == 1 ? cluster[3].length : cluster[1].length;
    count_2 = cluster[2].length == 1 ? cluster[3].length : cluster[2].length;
    count_3 = cluster[3].length == 1 ? cluster[3].length : cluster[3].length;
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
    labels: ["Cluster 0 ", "Cluster 1", "Cluster 2", "Cluster 3"],
    datasets: [
      {
        label: "Clusters",
        data: [count_0, count_1, count_2, count_3],
        backgroundColor: ["red", "blue", "orange", "green"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="">
      <div className="p-3 m-1 text-3xl bg-blue-100 text-blue-800 intro">
        <p>
          <strong>Recency:</strong> How recently a customer made a purchase. A
          lower score indicates a recent purchase.
        </p>
        <p>
          <strong>Frequency:</strong> How often a customer makes a purchase. A
          higher score indicates frequent purchases.
        </p>
        <p>
          <strong>Monetary:</strong> How much money a customer spends on
          purchases. A higher score indicates higher spending.
        </p>
      </div>
      <div className=" flex justify-around  bg-blue-100  text-black ">
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
                  {cluster.length < 1 ? 0 : cluster.length}
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

      <div className="p-3 text-3xl  bg-blue-100 text-blue-600 best ">
        <div>
          <strong> Best Customer RFM Score:</strong>
          <p>
            {data.bestCustomer
              ? data.bestCustomer.RFM.map((i) => Math.floor(i) + " ")
              : null}
          </p>
        </div>
        <div>
          <strong> Worst Customer RFM Score :</strong>
          <p>
            {data.worstCustomer
              ? data.worstCustomer.RFM.map((i) => Math.floor(i) + " ")
              : null}
          </p>
        </div>
      </div>
      <div className="m-3 p-3 bg-blue-100 charts">
        {data.rfm_statistics ? (
          <RFMCharts data={data} />
        ) : (
          <Loader loading="true" />
        )}
      </div>

      <div className="p-3 m-3 bg-slate-200 rfm ">
        <ScatterComponent
          ClusterData={data.rfm_statistics ? data.rfm_statistics : []}
        />
      </div>
    </div>
  );
};

export default Process;
