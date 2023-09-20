import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:trikutaseeds@gmail.com">
        <Button>Contact: trikutaseeds@gmail.com</Button>
      </a>
      <Button className="mob-no">+91-8959597999</Button>
    </div>
  );
};

export default Contact;
