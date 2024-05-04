import React from "react";

const ProductImg = (props) => {
    let classname = "carousel-item active"
    if(props.index !== 0){
        classname = "carousel-item"
    }
  return (
      <div className={classname}>
      <img
        src={props.img.url}
        className="d-block w-100"
        alt="Product_image"
        height={"350px"}
      />
    </div>
  );
};

export default ProductImg;
