import React from "react";

const AuthCard = ({ children }) => {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center align-content-center mt-4">
          <div className="col-md-4 bg-body-secondary p-3 rounded">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
