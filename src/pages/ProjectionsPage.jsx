import React, { useState, useEffect } from "react";
import RecordUserInput from "../components/RecordUserInput.jsx";
import "./style.scss"
import {  INPUT_ADD_BUDGET, 
          BUTTON_LABEL_ADD_BUDGET } from "../shared/constants.js";
import BudgetCard from "../components/BudgetCard.jsx";
import {  readBudgetItems, 
          createNewBudgetItem, 
          deleteAllBudgetItems,
          computeTotalExpenseForABudgetForAGivenMonth } from "../shared/LocalStorageManager.js";



/** ============================================================
 * This Component displays a page for performing CRUD to Budgets
 * @returns {JSX}
 ============================================================ */
const ProjectionsPage = () => {
  return <div className="projections-page">
    Projections Page coming soon!
  </div>
}

export default ProjectionsPage;