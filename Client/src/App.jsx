import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Modal from "./Components/Modal";
import Footer from "./Components/Footer"
import FrontPage from "./Components/Frontpage";

function App() {
  const [openModal, setOpenModal] = useState(false)

  console.log("STATE IS " + openModal)
  
  return (
    <div className="App">
      {openModal ? <Modal show={openModal} showModal={setOpenModal} /> : <div/>}
      <Header />
      <FrontPage setOpenModal={setOpenModal}/>
      <Footer/>
    </div>
  );
}

export default App;
