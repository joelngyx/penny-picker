import React, { useState, useEffect } from "react";
import RecordUserInput from "../components/RecordUserInput";
import "./style.scss"
import {  INPUT_ADD_BUDGET, 
          BUTTON_LABEL_ADD_BUDGET } from "../shared/constants";
import BudgetCard from "../components/BudgetCard";
import {  readBudgetItems, 
          createNewBudgetItem, 
          deleteAllBudgetItems } from "../shared/LocalStorageManager.js";



/** ============================================================
 * This Component displays a page for performing CRUD to Budgets
 * @returns {JSX}
 ============================================================ */
const LogFinances = () => {
  const [budgetsList, setBudgetsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  /** ===================================================================
   * Load the BudgetItems when the LogFinances React Component is mounted
   =================================================================== */
  useEffect (() => {
    let localStorageBudgetList = readBudgetItems();
    setBudgetsList(localStorageBudgetList);
  }, [])


  /** =============================================================
   * Function to create a new Budget Item and add it to budgetsList
   ============================================================= */
  const addToBudgetList = (val) => {
    let errorMessage = createNewBudgetItem(val);
    setErrorMessage(errorMessage);
    setBudgetsList(readBudgetItems());
  }


  /** ==============================================================
   * Function to clear error messages. Such error messages displayed
   * are based on the User's input. 
   * This function is passed to the RecordUserInput component
   ============================================================== */
  const clearErrorMessage = () => {
    setErrorMessage("");
  }


  /** =========================================
   * Clears all Budget Items from LocalStorage. 
   * This is for testing purposes
   ========================================= */
  const clearLocalStorage = () => {
    deleteAllBudgetItems();
    setBudgetsList([]);
  }


  /** =========
   * Render JSX
   ========= */
  return (
    <div className="log-finances-page">

      {/* Card for User to Add Budget */}
      <div className="log-finances-page-add-budget-div">
        <RecordUserInput 
          inputLabel={INPUT_ADD_BUDGET}
          updateToProvidedList={addToBudgetList}
          buttonLabel={BUTTON_LABEL_ADD_BUDGET}
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}/>
      </div>

      {/* Render all Budget items in LocalStorage as Budget Cards */}
      <div className="budget-list-div">
        {budgetsList.map((item, index) => (
          <BudgetCard key={index} budgetItem={item} setBudgetsList={setBudgetsList}/>
        ))}
      </div>

      <button onClick={clearLocalStorage}>Clear LocalStorage</button>
    </div>
  );
};

export default LogFinances;