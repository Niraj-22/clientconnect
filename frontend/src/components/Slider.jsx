import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import para1 from "../assets/dash2.png";
import para2 from "../assets/s2.png";
import dash1 from "../assets/dash1.png";
const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => {
  return (
    <AutoplaySlider
      className="custom-slider "
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={3000}
      animation="cubeAnimation"
    >
      <div className=" h-full bg-white w-full flex justify-center  ">
        <img src={dash1} alt="Image 1" className="h-fit" />
      </div>
      <div className="   bg-white w-full flex justify-center h-full ">
        <img src={para2} alt="Image 1" className=" h-fit" />
      </div>
      <div className=" h-full  bg-white w-full flex justify-center ">
        <img src={para1} alt="Image 1" className="h-fit" />
      </div>
    </AutoplaySlider>
  );
};
export default Slider;
