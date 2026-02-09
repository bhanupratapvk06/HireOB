import { FaPlay } from "react-icons/fa";
import "./VideoCta.css";

const VideoCta = () => {
  return (
    <div className="video-cta">
      <div className="video-box">
        <div className="overlay"></div>

        <button className="play-btn">
          <FaPlay />
        </button>

        <h1>
          Good Life Begins With <br /> A Good Company
        </h1>
      </div>

      <div className="video-features">
        <div className="feature">
          <span>1</span>
          <div>
            <h4>Elite candidates</h4>
            <p>Find highly qualified professionals for your team.</p>
            <a>Learn more</a>
          </div>
        </div>

        <div className="feature">
          <span>2</span>
          <div>
            <h4>Fast hiring</h4>
            <p>Streamlined process to hire talent faster.</p>
            <a>Learn more</a>
          </div>
        </div>

        <div className="feature">
          <span>3</span>
          <div>
            <h4>Trusted companies</h4>
            <p>Work with companies that value growth.</p>
            <a>Learn more</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCta;
