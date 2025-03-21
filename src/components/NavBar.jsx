import React from "react";
import "./style.scss"
import { PAGE_LOG_FINANCES } from "../shared/constants";



/**
 * To navigate between Pages
 */
const NavBar = ({currentSection, setCurrentSection}) => {
  const handleNavTabClick = (val) => {
    setCurrentSection(val);
  }

  return (
    <div className="nav-bar">
      <div className="nav-logo"></div>
      <div className={currentSection === PAGE_LOG_FINANCES ? "nav-tab-selected" : "nav-tab-unselected"}
        onClick={() => handleNavTabClick(PAGE_LOG_FINANCES)}>
        <p>Budgets and Expenses</p>
      </div>
      <div className={"nav-tab-unselected"}
        onClick={() => handleNavTabClick("temp")}>
        <p>Running Tabs</p>
      </div>
      <div className="nav-tab-unselected">
        <p></p>
      </div>
    </div>
  );
};

export default NavBar;