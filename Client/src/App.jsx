import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import CategoryTitle from "./Components/CategoryTitle";
import Modal from "./Components/Modal";
import ViewPicture from "./Components/ViewPicture";

function App() {
  const [openModal, setOpenModal] = useState(false)

  console.log("STATE IS " + openModal)
  
  return (
    <div className="App">
      {openModal ? <Modal show={openModal} showModal={setOpenModal} /> : <div></div>}
      <ViewPicture/>

      <div>
        <Header />

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
    </div>
  );
}

export default App;
