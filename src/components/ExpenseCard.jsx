import React, { useState } from "react";
import RecordUserInput from "./RecordUserInput";
import { INPUT_UPDATE_EXPENSE_DESCRIPTION, 
          INPUT_UPDATE_EXPENSE_AMOUNT,
          BUTTON_LABEL_UPDATE_EXPENSE_AMOUNT,
          BUTTON_LABEL_UPDATE_EXPENSE_DESCRIPTION } from "../shared/constants";
import { deleteBudgetItemExpenseItem, 
          readBudgetItems,
          updateBudgetItemExpenseItemDescription,
          updateBudgetItemExpenseItemAmount } from "../shared/LocalStorageManager";
import "./style.scss";



/** =====================================
 * This Component displays an ExpenseItem
 * and other components to perform CRUD
 * to this ExpenseItem
 * @param {integer} indexNum
 * @param {string} budgetName
 * @param {Object} expenseItem
 * @param {Function} setBudgetsList
 * @returns {JSX}
 ===================================== */
const ExpenseCard = ({indexNum, budgetName, expenseItem, setBudgetsList}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [editBudgetDetails, setEditBudgetDetails] = useState(false);


  /** ==================================================
   * This function clears this component's error message
   ================================================== */
  const clearErrorMessage = () => {
    setErrorMessage("");
  } 


  /** ==========================================================
   * These functions handle CRUD to this component's ExpenseItem
   ========================================================== */
  const handleDeleteExpenseItem = () => {
    deleteBudgetItemExpenseItem(budgetName, indexNum);
    setBudgetsList(readBudgetItems());
  }

  const handleUpdateExpenseItemDescription = (val) => {
    updateBudgetItemExpenseItemDescription(budgetName, indexNum, val);
    setBudgetsList(readBudgetItems());
  }

  const handleUpdateExpenseItemAmount = (val) => {
    updateBudgetItemExpenseItemAmount(budgetName, indexNum, val);
    setBudgetsList(readBudgetItems());
  }


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
    <div className="expense-card">
      <div className="expense-record">
        <div className="expense-card-description">{expenseItem.expenseDescription}</div>
        <div className="expense-card-amount">${expenseItem.expenseAmount}</div>
        <div className="expense-card-datetime">{expenseItem.dateTime.split("T")[0]}</div>
        {/* <div className="expense-card-datetime">{expenseItem.dateTime}</div> */}
        <button className="edit" onClick={toggleEditBudgetDetails}></button>
      </div>
      {(editBudgetDetails === true)
        ?
          <div className="expense-card-edit">
            <RecordUserInput inputLabel={INPUT_UPDATE_EXPENSE_DESCRIPTION}
                              updateToProvidedList={handleUpdateExpenseItemDescription}
                              buttonLabel={BUTTON_LABEL_UPDATE_EXPENSE_DESCRIPTION}
                              errorMessage={errorMessage}
                              clearErrorMessage={clearErrorMessage}/>
            <RecordUserInput inputLabel={INPUT_UPDATE_EXPENSE_AMOUNT}
                              updateToProvidedList={handleUpdateExpenseItemAmount}
                              buttonLabel={BUTTON_LABEL_UPDATE_EXPENSE_AMOUNT}
                              errorMessage={errorMessage}
                              clearErrorMessage={clearErrorMessage}/>
            <button onClick={handleDeleteExpenseItem}>Delete item</button>
          </div>
        :
          <></>}
    </div>
  )
}

export default ExpenseCard;