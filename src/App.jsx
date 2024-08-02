import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageSlider from './components/image_slider/ImageSlider';



function App() {

  return (
  
      <div>
        <ImageSlider limit={10} />
      </div>


 
  )
}

export default App
