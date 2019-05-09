import React from "react";
import "./TopLabel.css";
import imgSrc from "../../assets/img-2.jpg";

const TopLabel = () => {
  return (
    <div className="top-label text-center pt-5">
      <div className=" m-auto" style={{ width: 100, height: 100 }}>
        <img className="dashboard-img image-fluid w-100" src={imgSrc} />
      </div>
      <div className="top-label-text pt-2">
        <h6>Mahmoud Youssef</h6>
        <h6>Role: IT</h6>
      </div>
    </div>
  );
};

export default TopLabel;
