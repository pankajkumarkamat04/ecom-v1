import React from "react";
import ReactHelmet from "react-helmet";

const MetaData = (props) => {
  const siteName = "ECOM";

  return (
    <div>
      <ReactHelmet>
        <title>
          {props.title} - {siteName}
        </title>
        <meta name="description" content={props.description} />
      </ReactHelmet>
    </div>
  );
};

export default MetaData;
