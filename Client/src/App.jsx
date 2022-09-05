import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import CategoryTitle from './Components/CategoryTitle'


function App() {
  return (
    <div className="App">
      <Header/>
      <CategoryTitle noAdd={true} small={false} category="albums" title="Albums" image="albums"/>
      <CategoryTitle noAdd={true} small={true} category="images" title="Images" image="images"/>
      <CategoryTitle noAdd={false} small={true} category="favorites" title="Favorites" image="favorites"/>


    </div>
  )
}

export default App
