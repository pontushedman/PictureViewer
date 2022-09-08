import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import CategoryTitle from "./Components/CategoryTitle";
import AddModal from "./Components/AddModal";

function App() {
  const [openModal, setOpenModal] = useState() 
  return (
    <div className="App">
      {openModal ? <AddModal show={setOpenModal}/>: <div />}
      
      <div>
        <Header />

        <CategoryTitle
          noAdd={true}
          small={false}
          category="albums"
          title="Albums"
          image="albums"
        />
        <CategoryTitle
          noAdd={true}
          small={true}
          category="images"
          title="Images"
          image="images"
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
