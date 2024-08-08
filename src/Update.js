import React, { useState } from "react";
import "./Update.css";
import { useNavigate, useParams } from "react-router-dom";
import { updateDoc, doc, db } from "./FirebaseConfig";

const Update = () => {
  const { ID } = useParams();

  const [prodId, setProdId] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDescription, setProdDescription] = useState("");

  console.log(ID);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      prodId,
      prodName,
      prodPrice,
      prodDescription,
    });
  };

  const nav = useNavigate();

  async function update(tel) {
    const docRef = doc(db, "products", tel);

    await updateDoc(docRef, {
      productID: prodId,
      productName: prodName,
      productPrice: prodPrice,
      productDes: prodDescription,
    });
    nav("/home");
  }

  return (
    <div className="form-container1">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            value={prodId}
            onChange={(e) => setProdId(e.target.value)}
            required
          />
        </div>

        <div className="form-group1">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            required
          />
        </div>

        <div className="form-group1">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            value={prodPrice}
            onChange={(e) => setProdPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group1">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            value={prodDescription}
            onChange={(e) => setProdDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          className="but"
          type="submit"
          onClick={() => {
            update(ID);
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Update;
