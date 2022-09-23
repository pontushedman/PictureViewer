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
import ExtraModal from "./Components/ExtraModal";
import Footer from "./Components/Footer"
import FrontPage from "./Pages/FrontPage";
import AlbumsPage from "./Pages/AlbumsPage";
import PicturesPage from "./Pages/PicturesPage";
import { JSONContextProvider } from "./Store/JSONContext";
import { StorageContextProvider } from "./Store/StorageContext";

function App() {
  const [openModal, setOpenModal] = useState({ show: false, mode: null, id: null })
  const [openExtraModal, setOpenExtraModal] = useState({ show: false, message: ""})


  return (
    <JSONContextProvider>
      <StorageContextProvider>
        <div className="App">
          {openModal.show ? <Modal show={openModal.show} mode={openModal.mode} id={openModal.id} showExtraModal={setOpenExtraModal} showModal={setOpenModal} /> : <div />}
          {openExtraModal.show ? <ExtraModal show={openExtraModal.show} message={openExtraModal.message} showExtraModal={setOpenExtraModal} showModal={setOpenModal}/> : <div />}

          <Header />
          <Routes>
            <Route path="/" element={<FrontPage showModal={setOpenModal} />} />
            <Route path="/Albums" element={<AlbumsPage showModal={setOpenModal} />} />
            <Route path="/Images" element={<PicturesPage showModal={setOpenModal} />} />
          </Routes>
          <Footer />
        </div>
      </StorageContextProvider>
    </JSONContextProvider>
  );
}

export default App;
