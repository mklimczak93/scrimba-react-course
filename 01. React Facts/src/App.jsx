import React from "react"
import '/src/App.css'

import Header from "./components/Header.jsx"
import MainContent from "./components/MainContent.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  function switchMode() {
    setDarkMode(!darkMode);
    console.log(darkMode);
  }
  return (
    <div className="page">
            <Header darkMode={darkMode} toggleDarkMode={switchMode}/>
            <MainContent darkMode={darkMode}/>
            <Footer darkMode={darkMode}/>
        </div> 
  )
}

export default App
