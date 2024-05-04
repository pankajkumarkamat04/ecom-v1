import React from "react";
import {useNavigate} from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height : "85vh"}}>
      <div className="text-center">
        <h1>404</h1>
        <h5>Page Not Found</h5>
        <button className="btn btn-primary" onClick={ () => navigate("/")}>Back To Homepage</button>
      </div>
    </div>
  );
};

export default NotFound;
