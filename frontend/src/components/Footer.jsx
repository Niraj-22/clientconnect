import logo from "../assets/logo.webp";
const Footer = () => {
  return (
    <div className="flex space-x-7 p-5 pl-10">
      <div className="flex w-[70%] ">
        <img src={logo} alt="Logo" className="h-24" />
        <div>
          <p className="dancing-script-font text-6xl ">Client Connect</p>
          <p>Igniting Growth Through Targeted Marketing</p>
        </div>
      </div>
      <div className="flex flex-col  ">
        <div className="font-bold text-2xl">Location</div>
        <div>PUNE,MAHARASHTRA</div>
        <div className="font-bold text-2xl">Contact :</div>
        <div className="">customersegmentpro@gmail.com</div>
      </div>
    </div>
  );
};

export default Footer;
