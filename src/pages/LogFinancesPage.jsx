import React, { useState, useEffect } from "react";
import RecordUserInput from "../components/RecordUserInput.jsx";
import "./style.scss"
import {  INPUT_ADD_BUDGET, 
          BUTTON_LABEL_ADD_BUDGET } from "../shared/constants.js";
import BudgetCard from "../components/BudgetCard.jsx";
import {  readBudgetItems, 
          createNewBudgetItem, 
          computeTotalExpenseForABudgetForAGivenMonth } from "../shared/LocalStorageManager.js";



/** ============================================================
 * This Component displays a page for performing CRUD to Budgets
 * @returns {JSX}
 ============================================================ */
const LogFinancesPage = () => {
  const [budgetsList, setBudgetsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [overallSurplusOrDeficit, setOverallSurplusOrDeficit] = useState(0);
  const [overallBudget, setOverallBudget] = useState(0);
  const [overallExpense, setOverallExpense] = useState(0);


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
  // const clearLocalStorage = () => {
  //   deleteAllBudgetItems();
  //   setBudgetsList([]);
  // }

  useEffect(() => {
    getTotalSurplusOrDeficit();
  }, [budgetsList])

  const getTotalSurplusOrDeficit = () => {
    let localStorageBudgetItems = readBudgetItems();
    const now = new Date(); 
    const thisMonth = now.toISOString().split("T")[0];

    let totalExpenseAmount = 0;
    let totalBudgetAllocated = 0;

    for (let i = 0; i < localStorageBudgetItems.length; i++) {
      let totalExpenseForThisBudgetThisMonth = computeTotalExpenseForABudgetForAGivenMonth(thisMonth, localStorageBudgetItems[i].budgetName);
      totalExpenseAmount = parseFloat(totalExpenseAmount) + parseFloat(totalExpenseForThisBudgetThisMonth);
      totalBudgetAllocated = parseFloat(totalBudgetAllocated) + parseFloat(localStorageBudgetItems[i].budgetAmount);
    }

    let totalDifference = totalBudgetAllocated - totalExpenseAmount;
    setOverallBudget(totalBudgetAllocated);
    setOverallExpense(totalExpenseAmount);
    setOverallSurplusOrDeficit(totalDifference.toFixed(2));
  }

  /** =========
   * Render JSX
   ========= */
  return (
    <div className="log-finances-page">
      <div className="overall-status-this-month-div">
        <p>Overall Balance (This Month)</p>
        {(overallSurplusOrDeficit > 0) ? 
          <p className="overall-surplus-p">+${overallSurplusOrDeficit}</p> : 
          <p className="overall-deficit-p">-${Math.abs(overallSurplusOrDeficit)}</p>}
        <p>${overallExpense}(Spent)/${overallBudget}(Budgeted)</p>
      </div>
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

      {/* <button onClick={clearLocalStorage}>Clear LocalStorage</button> */}
    </div>
  );
};

export default LogFinancesPage;