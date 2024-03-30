import Slider from "./../Slider";
import para1 from "../../assets/upload.png";
import para3 from "../../assets/p3.png";
import para2 from "../../assets/p1.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Slider />
      </div>
      <div className="bg-gradient-to-b from-blue-500 to-blue-300 flex flex-col  text-white ">
        <div className="text-5xl p-4 mt-5">
          Welcome to <span className="dancing-script-font">ClientConnect</span>
          <p className="text-xl p-2">
            At ClientConnect, we empower you to gain valuable insights from your
            transaction data through advanced customer segmentation and
            visualization techniques. Whether you are a small business owner, a
            marketing professional, or an analyst, our platform simplifies the
            process of understanding your customers and making data-driven
            decisions.
          </p>
        </div>
        <div className="flex border border-slate-500 p-2 m-1 items-center">
          <img
            src={para1}
            alt="Customer Segmentation"
            width="38%"
            className="p-3"
          />
          <div className="p-8 pt-6 ">
            <p className="text-3xl text-center font-black">How it works</p>
            <ul className="text-xl">
              <li>
                <p className="font-bold">Upload Your CSV File:</p>
                Simply upload your transaction data in CSV format. Our platform
                supports various types of transaction data, including sales
                records, customer interactions, and more
              </li>
              <li>
                <p className="font-bold">Data Processing:</p> Once uploaded, our
                powerful algorithms analyze your data to identify key patterns
                and segments within your customer base.
              </li>
              <li>
                <p className="font-bold">Customer Segmentation:</p> We segment
                your customers based on various attributes such as purchase
                history, demographics, and behavioral patterns. This
                segmentation enables you to tailor your marketing strategies and
                improve customer engagement.
              </li>
              <li>
                <p className="font-bold">Visualize Insights: </p>Explore
                visually-rich dashboards and charts that provide intuitive
                representations of your segmented customer data. Understand
                trends, identify opportunities, and optimize your business
                strategies with ease.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex border border-slate-500 p-2 m-1 items-center">
          <div className="p-8 pt-6 ">
            <p className="text-3xl text-center font-black">Why Choose Us</p>
            <ul className="text-xl">
              <li>
                <p className="font-bold">Accuracy :</p>
                Our algorithms are designed to deliver accurate insights,
                ensuring reliable results for your business decisions.
              </li>
              <li>
                <p className="font-bold">Ease of Use:</p> Our user-friendly
                interface makes it easy for anyone to upload data, analyze it,
                and derive actionable insights.
              </li>
              <li>
                <p className="font-bold">Customization:</p> Tailor the
                segmentation criteria and visualization options to suit your
                specific business needs.
              </li>
              <li>
                <p className="font-bold">Security: </p>We prioritize the
                security and privacy of your data, employing industry-standard
                encryption and security measures.
              </li>
            </ul>
          </div>
          <img
            src={para2}
            alt="Customer Segmentation"
            width="50%"
            className="p-3"
          />
        </div>
        <div className="flex border border-slate-500 p-2 m-1 items-center">
          <img src={para3} alt="Benefits" width="50%" className="p-3" />
          <div className="p-8 pt-6 text-xl">
            <p className="text-3xl text-center font-black">Get Started today</p>
            <p className="p-3">
              Join the ranks of successful businesses leveraging data-driven
              insights to stay ahead of the competition. Sign up now and
              revolutionize the way you understand and interact with your
              customers.
            </p>
            <p className="p-3">
              Unlock the power of your transaction data. Sign up now to
              experience the benefits of customer segmentation and
              visualization.
            </p>
            <span className="p-3"> Login to get Started</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
