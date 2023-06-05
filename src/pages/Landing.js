import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobster logo" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            commodi doloremque porro quasi ratione exercitationem cumque eveniet
            tempore at, odit hic nobis numquam quas ipsum alias facere,
            perspiciatis quos similique.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
      </div>
      <img src={main} alt="job hunt" className="img main-img" />
    </Wrapper>
  );
};

export default Landing;
