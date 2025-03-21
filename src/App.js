import React, { useState } from "react";
import LogFinances from "./pages/LogFinances";
import NavBar from "./components/NavBar";
import "./shared/constants"
import { PAGE_LOG_FINANCES } from "./shared/constants";
import "./style.scss"



const App = () => {
  const [currentSection, setCurrentSection] = useState(PAGE_LOG_FINANCES);

  return (
    <div>
      <NavBar 
        currentSection={currentSection} 
        setCurrentSection={setCurrentSection}/>
      <div className="App">
        {currentSection === PAGE_LOG_FINANCES 
        ? <LogFinances/>
        : <div>2</div>}
      </div>
    </div>
  );
}

export default App;
