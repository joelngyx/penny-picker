import React, { useState } from "react";
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
          addBudgetItemExpenseItem } from "../shared/LocalStorageManager.js"



/**
 * This Component displays a Budget Item
 */
const BudgetCard = ({budgetItem, setBudgetsList}) => {
  const [updateBudgetNameErrorMessage, setUpdateBudgetNameErrorMessage] = useState("");
  const [updateBudgetAmountErrorMessage, setUpdateBudgetAmountErrorMessage] = useState("");
  const [addExpenseItemErrorMessage, setAddExpenseItemErrorMessage] = useState("");

  const clearBudgetAmountErrorMessage = () => {
    setUpdateBudgetAmountErrorMessage("");
  }

  const clearBudgetNameErrorMessage = () => {
    setUpdateBudgetNameErrorMessage("");
  }

  const clearAddExpenseItemErrorMessage = () => {
    setAddExpenseItemErrorMessage("");
  }

  const handleUpdateBudgetAmount = (val) => {
    let errorMessage = updateBudgetAmount(budgetItem.budgetName, val);
    setUpdateBudgetAmountErrorMessage(errorMessage);
    setBudgetsList(readBudgetItems()); // Trigger a re-render for updates
  }

  const handleUpdateBudgetName = (val) => {
    let errorMessage = updateBudgetName(budgetItem.budgetName, val);
    setUpdateBudgetNameErrorMessage(errorMessage);
    setBudgetsList(readBudgetItems()); // Trigger a re-render for updates
  }

  const handleAddExpenseItem = (expenseDescription, expenseAmount) => {
    let errorMessage = addBudgetItemExpenseItem(budgetItem.budgetName, expenseDescription, expenseAmount);
    setAddExpenseItemErrorMessage(errorMessage);
    setBudgetsList(readBudgetItems()); // Trigger a re-render for updates
  }

  const handleDeleteBudgetItem = () => {
    deleteBudgetItem(budgetItem.budgetName);
    setBudgetsList(readBudgetItems()); // Trigger a re-render for updates
  }

  return (
    <div className="budget-card">
      <p>{budgetItem.budgetName}</p>
      <p>Allocated: {budgetItem.budgetAmount}</p>
      <button onClick={handleDeleteBudgetItem}>Delete Budget</button>
      {/* This RecordUserInput component updates BudgetAmount */}
      <RecordUserInput inputLabel={INPUT_UPDATE_BUDGET_AMOUNT}
                        updateToProvidedList={handleUpdateBudgetAmount}
                        buttonLabel={BUTTON_UPDATE_BUDGET_AMOUNT}
                        errorMessage={updateBudgetAmountErrorMessage}
                        clearErrorMessage={clearBudgetAmountErrorMessage}/>
      {/* This RecordUserInput component updates BudgetName */}
      <RecordUserInput inputLabel={INPUT_UPDATE_BUDGET_NAME}
                        updateToProvidedList={handleUpdateBudgetName}
                        buttonLabel={BUTTON_UPDATE_BUDGET_NAME}
                        errorMessage={updateBudgetNameErrorMessage}
                        clearErrorMessage={clearBudgetNameErrorMessage}/>
      {/* This RecordUserInput component updates BudgetName */}
      <RecordUserInput inputLabel={INPUT_ADD_EXPENSE}
                        updateToProvidedList={handleAddExpenseItem}
                        buttonLabel={BUTTON_LABEL_ADD_EXPENSE}
                        errorMessage={addExpenseItemErrorMessage}
                        clearErrorMessage={clearAddExpenseItemErrorMessage}/>
      {budgetItem.expenseList.map((item, index) => (
        <ExpenseCard key={index} 
          indexNum={index}
          budgetName={budgetItem.budgetName}
          expenseItem={item}
          setBudgetsList={setBudgetsList}/>
      ))}
    </div>
  );
};

export default BudgetCard;
