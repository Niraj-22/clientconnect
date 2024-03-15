import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import bg from "./../assets/bg.jpg";
import para1 from "../assets/para1.jpeg";
import para3 from "../assets/para3.jpeg";
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
      <div data-src={para3} />
      <div data-src={bg} />
      <div data-src={para1} />
    </AutoplaySlider>
  );
};
export default Slider;
