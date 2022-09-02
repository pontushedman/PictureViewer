import { useState } from 'react'
import './App.css'
import Header from './Header'
import Category from './Category'


function App() {
  return (
    <div className="App">
      <Header/>
      <Category noAdd={true} category="album" title="Albums"/>
      <Category noAdd={true} category="images" title="Images"/>
      <Category noAdd={false} category="favorites" title="Favorites"/>


    </div>
  )
}

export default App
