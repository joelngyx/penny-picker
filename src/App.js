import React, { useState } from "react";
import LogFinancesPage from "./pages/LogFinancesPage";
import RunningTabsPage from "./pages/RunningTabsPage";
import NavBar from "./components/NavBar";
import "./shared/constants"
import { PAGE_LOG_FINANCES,
         PAGE_RUNNING_TABS } from "./shared/constants";
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
        ? <LogFinancesPage/>
        : (currentSection === PAGE_RUNNING_TABS)
          ? <RunningTabsPage/>
          : <div>2</div>
        }
      </div>
    </div>
  );
}

export default App;
