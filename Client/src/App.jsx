import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import CategoryTitle from "./Components/CategoryTitle";
import AddModal from "./Components/AddModal";

function App() {
  const [openModal, setOpenModal] = useState()

  console.log("STATE IS " + openModal)
  
  return (
    <div className="App">
      {openModal ? <AddModal show={openModal} showModal={setOpenModal} /> : <div></div>}
      
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
