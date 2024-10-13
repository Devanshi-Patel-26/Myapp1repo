/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { storage } from "./FirebaseConfig";
import { app, collection, onSnapshot, db, deleteDoc, doc, updateDoc } from "./FirebaseConfig";

const Home = () => {

  const nav = useNavigate();

  const [allDocs, setAllDocs] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "products"), (snap) => {
      const allData = snap.docs.map((e) => ({ id: e.id, ...e.data() }));
      console.log(allData);
      setAllDocs(allData);
    });
  }, []);
  
  return (
    <div className="wholepages">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/signout" className="navbar-link">
              Signout
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/signup" className="navbar-link">
              logout
            </Link>
          </li>
        </ul>
      </nav>
      <div className="signinemail">{localStorage.getItem("sigInEmail")}</div>
      <div className="outer-box">
        {allDocs.map((item, i) => (
          <div key={i} className="box">
            <p>Product ID: {item.productID}</p>
            <p>Product Name: {item.productName}</p>
            <p>Product Price: {item.productPrice}</p>
            <p>Product Des: {item.productDes}</p>
            <p src="productImage">Product url: {item.productImage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
