import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import bg from "./../assets/bg.jpg";

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
      <div data-src={bg} />
      <div data-src={bg} />
      <div data-src={bg} />
    </AutoplaySlider>
  );
};
export default Slider;
