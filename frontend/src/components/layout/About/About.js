import React from "react";
import "./AboutSection.css";
import { Button, Typography } from "@mui/material";
const About = () => {
  const visitInstagram = () => {
    window.location = "/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <img
              style={{
                width: "15vmax",
                height: "15vmax",
                margin: "1.5vmax 0",
                objectFit: "contain",
              }}
              src="https://res.cloudinary.com/dmnjtpuzu/image/upload/v1692390243/Ecommerce/qpivyser2h3xc5ethmji.png"
              alt="Founder"
            />
            <Typography>Plant Good Seeds Today</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Home
            </Button>
            <span>We are a company that sell seeds.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
