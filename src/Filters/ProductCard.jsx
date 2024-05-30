import React from "react";
import ReactStars from "react-stars";

const ProductCard = ({ curProduct }) => {
  const { name, images, price, brand, description, title } = curProduct;
  return (
    <div style={{ widt: "25%" }}>
      <div className="card" style={{ width: "18rem" }}>
        <img src={images[0]} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Product Info</h5>
          <p className="card-text">Name :{name ? name : "Random name"}</p>
          <p className="card-text">Price {price && price}</p>
          <p className="card-text">Title {title && title}</p>

          <p className="card-text">
            Description : {description && description}
          </p>
          <p className="card-text">
            <ReactStars count={2} size={24} color2={"red"} edit={false} />
          </p>
          <p className="card-text">{name && name}</p>

          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
