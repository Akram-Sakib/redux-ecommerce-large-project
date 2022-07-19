import React from "react";
import "./Contact.css";
import emailjs from "emailjs-com";
import { useAlert } from "react-alert";

const Contact = () => {
  const alert = useAlert();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_in1cinu",
        "template_beh3o3b",
        e.target,
        "user_GFZkak7lkFm9Ad6G3J8K1"
      )
      .then(
        (result) => {
          if (result) {
            alert.success("thanks for your message");
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }
  return (
    <div className="contact" data-aos="fade-up">
      <div className="contact-section" data-aos="fade-right">
        <h1>get in touch</h1>
        <form onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Name" /> <br />
          <input type="email" name="email" placeholder="Email" /> <br />
          <input type="text" name="subject" placeholder="Subject" /> <br />
          <textarea
            name="message"
            cols="30"
            rows="4"
            placeholder="Message"
          ></textarea>{" "}
          <br />
          <button type="submit">Send message</button>
        </form>
      </div>
      <div className="contact-img" data-aos="fade-right">
        <img src="https://i.ibb.co/Y013G87/hme-persona-portrait.webp" alt="" />
      </div>
    </div>
  );
};

export default Contact;
