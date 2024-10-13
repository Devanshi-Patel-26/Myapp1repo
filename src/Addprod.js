/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./Addprod.css";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import {
  app,
  db,
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  doc
} from "./FirebaseConfig";
import { storage } from "./FirebaseConfig";
import { ref, uploadBytes, getStorage , getDownloadURL} from "firebase/storage";

const Addprod = () => {

  const [allDocs, setAllDocs] = useState([]);

  const nav = useNavigate();

  const [file, setFile] = useState(null);

  useEffect(() => {const email= localStorage.getItem("signInEmail")
    if(email === "admin1234@gmail.com"){
        nav("/addprod");
    }
  })

  useEffect(() => {
        onSnapshot(collection(db, "products"), (snap) => {
          const allData = snap.docs.map((e) => ({ id: e.id, ...e.data() }));
          console.log(allData);
          setAllDocs(allData);
        });
      }, []);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  var Iurl = null;
  
  const [prodData, setProdData] = useState({
    prodId: "",
    prodName: "",
    prodPrice: "",
    prodDes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", prodData);
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
   await uploadBytes(storageRef, file)
      .then(async() => {
        console.log("Uploaded a blob or filed!");
       await getDownloadURL(ref(storage, file.name))
          .then((url) => {
            Iurl = url;
            console.log(url);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    const docRef = await addDoc(collection(db, "products"), {
      productID: prodData.prodId,
      productName: prodData.prodName,
      productPrice: prodData.prodPrice,
      productDes: prodData.prodDes,
      productImage:Iurl,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function del(it) {
    deleteDoc(doc(db, "products", it));
  }

  return (
    <div className="wholepage">
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
      <div className="form-container">
        <h2>Product Form</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="productId">Product ID:</label>
            <input
              type="text"
              id="productId"
              name="productId"
              value={prodData.prodId}
              onChange={(e) =>
                setProdData({ ...prodData, prodId: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={prodData.prodName}
              onChange={(e) =>
                setProdData({ ...prodData, prodName: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={prodData.prodPrice}
              onChange={(e) =>
                setProdData({ ...prodData, prodPrice: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productDescription">Product Description:</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={prodData.prodDes}
              onChange={(e) =>
                setProdData({ ...prodData, prodDes: e.target.value })
              }
              required
            />
          </div>
          <input onChange={handleChange} type="file" className="file-input" />
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="outer-box">
        {allDocs.map((item, i) => (
          <div key={i} className="box">
            <p>Product ID: {item.productID}</p>
            <p>Product Name: {item.productName}</p>
            <p>Product Price: {item.productPrice}</p>
            <p>Product Des: {item.productDes}</p>
            <p src="productImage">Product url: {item.productImage}</p>
            <button
              onClick={() => {
                del(item.id);
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                nav(`/update/${item.id}`);
              }}
            >
              update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addprod;
