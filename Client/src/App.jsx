import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import CategoryTitle from "./Components/CategoryTitle";
import Modal from "./Components/Modal";
import ViewPicture from "./Components/ViewPicture";
import AddPicture from "./Components/AddPicture";
import Footer from "./Components/Footer"

function App() {
  const [openModal, setOpenModal] = useState(false)

  console.log("STATE IS " + openModal)
  
  return (
    <div className="App">
      <Header />

      {openModal ? <Modal show={openModal} showModal={setOpenModal} /> : <div/>}
      <div className="mainContainer">
        <CategoryTitle
          noAdd={true}
          small={false}
          category="albums"
          title="Albums"
          image="albums"
          showModal={setOpenModal}
        />
        <CategoryTitle
          noAdd={true}
          small={true}
          category="images"
          title="Images"
          image="images"
          showModal={setOpenModal}
        />
        <CategoryTitle
          noAdd={false}
          small={true}
          category="favorites"
          title="Favorites"
          image="favorites"
        />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
