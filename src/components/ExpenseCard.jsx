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



const ExpenseCard = ({indexNum, budgetName, expenseItem, setBudgetsList}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteExpenseItem = () => {
    deleteBudgetItemExpenseItem(budgetName, indexNum);
    setBudgetsList(readBudgetItems());
  }

  const clearErrorMessage = () => {
    setErrorMessage("");
  } 

  const handleUpdateExpenseItemDescription = (val) => {
    updateBudgetItemExpenseItemDescription(budgetName, indexNum, val);
    setBudgetsList(readBudgetItems());
  }

  const handleUpdateExpenseItemAmount = (val) => {
    updateBudgetItemExpenseItemAmount(budgetName, indexNum, val);
    setBudgetsList(readBudgetItems());
  }
  

  return (
    <div className="expense-card">
      {indexNum} {expenseItem.expenseDescription} {expenseItem.expenseAmount} {expenseItem.dateTime}
      <button onClick={handleDeleteExpenseItem}>Delete item</button>
      <p>{errorMessage}</p>
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
    </div>
  )
}

export default ExpenseCard;