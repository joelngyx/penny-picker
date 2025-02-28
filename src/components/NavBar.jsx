import React from "react";
import "./style.scss"
import { PAGE_LOG_FINANCES } from "../shared/constants";



/**
 * To navigate between Pages
 */
const NavBar = (props) => {
  const handleNavTabClick = (val) => {
    props.setCurrentSection(val)
  }

  return (
    <div className="nav-bar">
      <div className={props.currentSection === PAGE_LOG_FINANCES ? "nav-tab-selected" : "nav-tab-unselected"}
        onClick={() => handleNavTabClick(PAGE_LOG_FINANCES)}>
        Log Finances
      </div>
      <div className="nav-tab-unselected">
        2
      </div>
      <div className="nav-tab-unselected">
        3
      </div>
    </div>
  );
};

export default NavBar;