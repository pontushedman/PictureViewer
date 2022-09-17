import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter
} from "react-router-dom";

import "./App.css";
import Header from "./Components/Header";
import Modal from "./Components/Modal";
import Footer from "./Components/Footer"
import FrontPage from "./Pages/FrontPage";
import AlbumsPage from "./Pages/AlbumsPage";
import PicturesPage from "./Pages/PicturesPage";
import { ImgContexProvider } from "./store/img";

function App() {
  const [openModal, setOpenModal] = useState({ show: false, mode: null, id: null })
  console.log("App rendered")

  return (
    <ImgContexProvider>
      <div className="App">
        {openModal.show ? <Modal show={openModal.show} mode={openModal.mode} id={openModal.id} showModal={setOpenModal} /> : <div />}
        <Header />
        <Routes>
          <Route path="/" element={<FrontPage showModal={setOpenModal} />} />
          <Route path="/Albums" element={<AlbumsPage showModal={setOpenModal} />} />
          <Route path="/Images" element={<PicturesPage showModal={setOpenModal} />} />
        </Routes>
        <Footer />
      </div>
    </ImgContexProvider>
  );
}

export default App;
