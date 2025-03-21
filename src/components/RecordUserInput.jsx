import React, { useState, useRef } from "react";
import "../shared/constants"
import "./style.scss"
import {  INPUT_ADD_BUDGET, 
          INPUT_ADD_EXPENSE, 
          INPUT_UPDATE_BUDGET_NAME,
          INPUT_UPDATE_BUDGET_AMOUNT,
          INPUT_UPDATE_EXPENSE_DESCRIPTION,
          INPUT_UPDATE_EXPENSE_AMOUNT } from "../shared/constants";



/** =====================================================
 * This Component displays JSX for Users to provide input
 * @param {string} inputLabel
 * @param {Function} updateToProvidedList
 * @param {string} buttonLabel
 * @param {string} errorMessage
 * @param {Function} clearErrorMessage
 * @returns {JSX}
 ===================================================== */
const RecordUserInput = ({inputLabel, 
                          updateToProvidedList, 
                          buttonLabel, 
                          errorMessage,
                          clearErrorMessage}) => {
  const [userInput1, setUserInput1] = useState("");
  const [userInput2, setUserInput2] = useState("");
  const userInputRef1 = useRef(null);
  const userInputRef2 = useRef(null);


  /** ===================================================
   * This function handles the parameters expected by the 
   * updateToProvidedList passed into the RecordUserInput 
   * component via props
   =================================================== */
  const handleAddButton = () => {
    switch (inputLabel) {
      case INPUT_ADD_BUDGET:
      case INPUT_UPDATE_BUDGET_NAME:
      case INPUT_UPDATE_BUDGET_AMOUNT:
      case INPUT_UPDATE_EXPENSE_DESCRIPTION:
      case INPUT_UPDATE_EXPENSE_AMOUNT:  
        updateToProvidedList(userInput1);
        break;
      case INPUT_ADD_EXPENSE:
        updateToProvidedList(userInput1, userInput2);
        break;
      default:
        break;
    }
  }


  /** =================================================
   * These functions handle the state updates per input
   * provided by Users
   ================================================= */
  const handleOnChangeInput1 = (val) => {
    console.log(val)
    setUserInput1(val);
    clearErrorMessage();
  }

  const handleOnChangeInput2 = (val) => {
    console.log(val)
    setUserInput2(val);
    clearErrorMessage();
  }

  
  /** ================================================
   * This switch case is responsible for rendering JSX
   * according to the provided inputLabel (via props)
   ================================================ */
  switch (inputLabel) {
    case INPUT_ADD_BUDGET:
    case INPUT_UPDATE_BUDGET_AMOUNT:
    case INPUT_UPDATE_BUDGET_NAME:
    case INPUT_UPDATE_EXPENSE_DESCRIPTION:
    case INPUT_UPDATE_EXPENSE_AMOUNT:
      return (
        <div className="record-user-input-div">
          <input 
            onChange={e => handleOnChangeInput1(e.target.value)}
            ref={userInputRef1}></input>
          <button onClick={handleAddButton}>{buttonLabel}</button>
          <p>{errorMessage}</p>
        </div>
      )
    case INPUT_ADD_EXPENSE:
      return (
        <div className="record-user-input-add-expense-div">
          <input 
            onChange={e => handleOnChangeInput1(e.target.value)}
            ref={userInputRef1}
            placeholder="Description"></input>
          <input 
            onChange={e => handleOnChangeInput2(e.target.value)}
            ref={userInputRef2}
            placeholder="Amount Spent"></input>
          <button onClick={handleAddButton}>{buttonLabel}</button>
          <p>{errorMessage}</p>
        </div>
      )
    default:
      return (
        <div>ERROR</div>
      )
  }
};

export default RecordUserInput;
