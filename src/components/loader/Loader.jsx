import React from "react";
import Loader from "react-loaders";

const MyLoader = () => {
  return (
    <div className="container">
      <div className="row justify-contentcenter">
        <div className="containerRow margin30"><Loader type="ball-pulse" /></div>
      </div>
    </div>
  );
};

export default MyLoader;
