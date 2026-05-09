import React from "react";
import "./style.scss"
import {  PAGE_LOG_FINANCES,
          PAGE_RUNNING_TABS,
          PAGE_PROJECTIONS } from "../shared/constants";
import BudgetIconImg from "../assets/budget-icon.svg";
import RunningTabIconImg from "../assets/running-tab-icon.svg";     
import ProjectionsIconImg from "../assets/projection-icon.svg";    


/** =================================================================
 * This Component handles the Navigation Bar, to switch between Pages
 * @param {string} currentSection
 * @param {Function} setCurrentSection
 * @returns {JSX}
 ================================================================= */
const NavBar = ({currentSection, setCurrentSection}) => {
  const handleNavTabClick = (val) => {
    setCurrentSection(val);
  }

  return (
    <div className="nav-bar">
      <div className="nav-logo">pennyPicker.{currentSection === PAGE_LOG_FINANCES ? "budgetsAndExpenses": currentSection === PAGE_RUNNING_TABS ? "tabs" : "projections"}</div>
      <div className="nav-bar-selection">
        <div className={currentSection === PAGE_LOG_FINANCES ? "nav-tab-selected" : "nav-tab-unselected"}
          onClick={() => handleNavTabClick(PAGE_LOG_FINANCES)}>
          <img src={BudgetIconImg} alt="budget-icon"/>
        </div>
        <div className={currentSection === PAGE_RUNNING_TABS ? "nav-tab-selected" : "nav-tab-unselected"}
          onClick={() => handleNavTabClick(PAGE_RUNNING_TABS)}>
          <img src={RunningTabIconImg} alt="running-tab-icon"/>
        </div>
        <div className={currentSection === PAGE_PROJECTIONS ? "nav-tab-selected" : "nav-tab-unselected"}
          onClick={() => handleNavTabClick(PAGE_PROJECTIONS)}>
          <img src={ProjectionsIconImg} alt="projection-icon"/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;