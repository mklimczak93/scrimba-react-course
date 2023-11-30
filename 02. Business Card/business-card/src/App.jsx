import './App.css'

import InfoSection from "./components/InfoSection.jsx"
import AboutSection from "./components/AboutSection.jsx"
import InterestsSection from "./components/InterestsSection.jsx"
import LinksSection from "./components/LinksSection.jsx"

function App() {
  return (
    <div className="card">
            <InfoSection />
            <div className="main-description">
              <AboutSection />
              <InterestsSection />
            </div>
            <LinksSection />
        </div> 
  )
}

export default App