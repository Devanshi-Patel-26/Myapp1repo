import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Home from "./Home";
import Addprod from "./Addprod";
import Signout from "./Signout";
import Update from "./Update";
//import Admin from "./Admin";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signout" element={<Signout />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/addprod" element={<Addprod />}></Route>
          <Route path="/update/:ID" element={<Update />}></Route>
          {/* <Route path="/admin" element={<Admin />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
