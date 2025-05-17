import React from "react";
import "./style.scss"
import {  PAGE_LOG_FINANCES,
          PAGE_RUNNING_TABS } from "../shared/constants";
import BudgetIconImg from "../assets/budget-icon.svg";
import RunningTabIconImg from "../assets/running-tab-icon.svg";         


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
      <div className="nav-logo">pennyPicker.{currentSection === PAGE_LOG_FINANCES ? "budgetsAndExpenses": "tabs"}</div>
      <div className="nav-bar-selection">
        <div className={currentSection === PAGE_LOG_FINANCES ? "nav-tab-selected" : "nav-tab-unselected"}
          onClick={() => handleNavTabClick(PAGE_LOG_FINANCES)}>
          <img src={BudgetIconImg} alt="budget-icon"/>
        </div>
        <div className={currentSection === PAGE_RUNNING_TABS ? "nav-tab-selected" : "nav-tab-unselected"}
          onClick={() => handleNavTabClick(PAGE_RUNNING_TABS)}>
          <img src={RunningTabIconImg} alt="budget-icon"/>
        </div>
      </div>
      {/* <div className={currentSection === PAGE_PROJECTIONS ? "nav-tab-selected" : "nav-tab-unselected"}
        onClick={() => handleNavTabClick(PAGE_PROJECTIONS)}>
        <p>Incomes and Projections</p>
      </div> */}
    </div>
  );
};

export default NavBar;