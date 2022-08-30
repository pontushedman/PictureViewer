import { useState } from 'react'
import './App.css'
import Header from './Header'
import Category from './Category'


function App() {
  return (
    <div className="App">
      <Header/>
      <Category category="album" title="Albums"/>
      <Category category="image" title="Image"/>
      <Category category="favorites" title="Favorites"/>


    </div>
  )
}

export default App
