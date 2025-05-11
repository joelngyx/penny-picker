import React, { useEffect, useState } from "react";
import {  INPUT_UPDATE_BUDGET_NAME, 
          INPUT_UPDATE_BUDGET_AMOUNT,
          INPUT_ADD_EXPENSE, 
          BUTTON_UPDATE_BUDGET_NAME, 
          BUTTON_UPDATE_BUDGET_AMOUNT,
          BUTTON_LABEL_ADD_EXPENSE } from "../shared/constants";
import RecordUserInput from "./RecordUserInput";
import ExpenseCard from "./ExpenseCard.jsx";
import "./style.scss";
import { updateBudgetAmount, 
          readBudgetItems,
          updateBudgetName,
          deleteBudgetItem,
          addBudgetItemExpenseItem,
          computeTotalExpenseForABudgetForAGivenMonth } from "../shared/LocalStorageManager.js"



 /** ===================================
  * This Component displays a BudgetItem 
  * and other components to perform CRUD
  * to this BudgetItem
  * @param {Object} budgetItem 
  * @param {Function} setBudgetsList
  * @returns {JSX}
  ==================================== */
const BudgetCard = ({budgetItem, setBudgetsList}) => {
  const [updateBudgetNameErrorMessage, setUpdateBudgetNameErrorMessage] = useState("");
  const [updateBudgetAmountErrorMessage, setUpdateBudgetAmountErrorMessage] = useState("");
  const [addExpenseItemErrorMessage, setAddExpenseItemErrorMessage] = useState("");
  const [editBudgetDetails, setEditBudgetDetails] = useState(false);
  const [amountSpentThisMonth, setAmountSpentThisMonth] = useState(0);
  const [surplusOrDeficit, setSurplusOrDeficit] = useState(0);


  useEffect(() => {
    handleAmountSpentForThisBudgetThisMonth();
    // eslint-disable-next-line
  }, [])

  /** ===================================
   * These functions clear error messages
   =================================== */
  const clearBudgetAmountErrorMessage = () => {
    setUpdateBudgetAmountErrorMessage("");
  }

  const clearBudgetNameErrorMessage = () => {
    setUpdateBudgetNameErrorMessage("");
  }

  const clearAddExpenseItemErrorMessage = () => {
    setAddExpenseItemErrorMessage("");
  }


  /** ==========================================================
   * These functions perform CRUD to this component's BudgetItem
   ========================================================== */
  const handleUpdateBudgetAmount = (val) => {
    let errorMessage = updateBudgetAmount(budgetItem.budgetName, val);
    setUpdateBudgetAmountErrorMessage(errorMessage);
    setBudgetsList(readBudgetItems()); // Trigger a re-render for updates
    handleAmountSpentForThisBudgetThisMonth();
  }

  const handleUpdateBudgetName = (val) => {
    let errorMessage = updateBudgetName(budgetItem.budgetName, val);
    setUpdateBudgetNameErrorMessage(errorMessage);
    setBudgetsList(readBudgetItems()); // Trigger a re-render for updates
    handleAmountSpentForThisBudgetThisMonth();
  }

  const handleAddExpenseItem = (expenseDescription, expenseAmount) => {
    let errorMessage = addBudgetItemExpenseItem(budgetItem.budgetName, expenseDescription, expenseAmount);
    setAddExpenseItemErrorMessage(errorMessage);
    setBudgetsList(readBudgetItems()); // Trigger a re-render for updates
    handleAmountSpentForThisBudgetThisMonth();
  }

  const handleDeleteBudgetItem = () => {
    deleteBudgetItem(budgetItem.budgetName);
    setBudgetsList(readBudgetItems()); // Trigger a re-render for updates
    handleAmountSpentForThisBudgetThisMonth();
  }

  const handleAmountSpentForThisBudgetThisMonth = () => {
    const now = new Date(); 
    const thisMonth = now.toISOString().split("T")[0].substring(0,8);
    let totalExpenseForThisBudgetThisMonth = computeTotalExpenseForABudgetForAGivenMonth(thisMonth, budgetItem.budgetName);
    setAmountSpentThisMonth(totalExpenseForThisBudgetThisMonth);
    let differenceAllocatedVsSpent = budgetItem.budgetAmount - totalExpenseForThisBudgetThisMonth;
    if (differenceAllocatedVsSpent < 0) {
      setSurplusOrDeficit(`Deficit $${Math.abs(differenceAllocatedVsSpent.toFixed(2))}`);
    } else {
      setSurplusOrDeficit(`Surplus $${Math.abs(differenceAllocatedVsSpent.toFixed(2))}`);
    }
  }

  /**
   * 
   */
  const toggleEditBudgetDetails = () => {
    if (editBudgetDetails === true) {
      setEditBudgetDetails(false);
    } else {
      setEditBudgetDetails(true);
    }
  }

  
  /** =========
   * Render JSX
   ========= */
  return (
    <div className="budget-card">
      <p>Budget: {budgetItem.budgetName}</p>
      <p>Allocated: ${budgetItem.budgetAmount} [{surplusOrDeficit}]</p>
      <p>Spent this month: ${amountSpentThisMonth}</p>
      <button className="budget-card-edit-button" onClick={toggleEditBudgetDetails}>{(editBudgetDetails === true) ? "Hide": "Edit Budget"}</button>

      {/* This RecordUserInput component updates BudgetAmount */}
      {(editBudgetDetails === true) 
        ? <div className="budget-card-edit">
           <RecordUserInput 
              inputLabel={INPUT_UPDATE_BUDGET_AMOUNT}
              updateToProvidedList={handleUpdateBudgetAmount}
              buttonLabel={BUTTON_UPDATE_BUDGET_AMOUNT}
              errorMessage={updateBudgetAmountErrorMessage}
              clearErrorMessage={clearBudgetAmountErrorMessage}/>

            {/* This RecordUserInput component updates BudgetName */}
            <RecordUserInput 
              inputLabel={INPUT_UPDATE_BUDGET_NAME}
              updateToProvidedList={handleUpdateBudgetName}
              buttonLabel={BUTTON_UPDATE_BUDGET_NAME}
              errorMessage={updateBudgetNameErrorMessage}
              clearErrorMessage={clearBudgetNameErrorMessage}/>
            <button onClick={handleDeleteBudgetItem}>Delete Budget</button>
          </div>
        : <></>}
     

      {/* This RecordUserInput component updates BudgetName */}
      <RecordUserInput 
        inputLabel={INPUT_ADD_EXPENSE}
        updateToProvidedList={handleAddExpenseItem}
        buttonLabel={BUTTON_LABEL_ADD_EXPENSE}
        errorMessage={addExpenseItemErrorMessage}
        clearErrorMessage={clearAddExpenseItemErrorMessage}/>

      {budgetItem.expenseList.map((item, index) => (
        <ExpenseCard 
          key={index} 
          indexNum={index}
          budgetName={budgetItem.budgetName}
          expenseItem={item}
          setBudgetsList={setBudgetsList}
          handleAmountSpentForThisBudgetThisMonth={handleAmountSpentForThisBudgetThisMonth}/>
      ))}
    </div>
  );
};

export default BudgetCard;
