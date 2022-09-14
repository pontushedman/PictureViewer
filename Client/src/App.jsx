import React, { useState, useContext, createContext } from "react";
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

function App() {
	const [openModal, setOpenModal] = useState(false)
	console.log("STATE IS " + openModal)

	return (
		<div className="App">
			{openModal ? <Modal show={openModal} showModal={setOpenModal} /> : <div />}
			<Header apa={LibraryContext.value} />
			<Routes>
				<Route path="/" element={<FrontPage setOpenModal={setOpenModal} />} />
				<Route path="/Albums" element={<AlbumsPage />} />
				<Route path="/Pictures" element={<PicturesPage />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
