import "./Contact.css";
import { LuPhone, LuMail, LuClock, LuMapPin } from "react-icons/lu";

const Contact = () => {
  return (
    <div className="contact">

      <div className="opening">
        <h1>Contact Us</h1>
      </div>

      <div className="contact-region">

        <div className="contact-left">
          <h2>
            Let’s Build Your Next Career Move Together
          </h2>

          <p>
            Have questions about job opportunities, hiring, or using HireOB?
            Our team is here to help you every step of the way. Reach out to us
            for support, partnerships, or general inquiries — we’d love to hear from you.
          </p>

          <div className="info-grid">
            <div className="info">
              <LuPhone color="#309689" size={20} />
              <div>
                <h4>Call Us</h4>
                <p>+257 388-6895</p>
              </div>
            </div>

            <div className="info">
              <LuMail color="#309689" size={20} />
              <div>
                <h4>Email Support</h4>
                <p>support@hireob.com</p>
              </div>
            </div>

            <div className="info">
              <LuClock color="#309689" size={20} />
              <div>
                <h4>Working Hours</h4>
                <p>Monday – Friday · 10AM – 6PM</p>
              </div>
            </div>

            <div className="info">
              <LuMapPin color="#309689" size={20} />
              <div>
                <h4>Our Office</h4>
                <p>19 North Road, Piscataway, NY 08854</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h3>Get In Touch</h3>
          <p className="subtitle">
            Send us a message and our team will respond within 24 hours.
          </p>

          <div className="row">
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
          </div>

          <input placeholder="Email Address" />

          <textarea placeholder="Tell us how we can help you..." rows="5" />

          <button>Send Message</button>
        </div>

      </div>

      <div className="contact-map">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />
      </div>

    </div>
  );
};

export default Contact;
