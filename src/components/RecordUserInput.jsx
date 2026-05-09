import React, { useState, useRef, useEffect } from "react";
import "../shared/constants"
import "./style.scss"
import {  INPUT_ADD_BUDGET, 
          INPUT_ADD_EXPENSE, 
          INPUT_UPDATE_BUDGET_NAME,
          INPUT_UPDATE_BUDGET_AMOUNT,
          INPUT_UPDATE_EXPENSE_DESCRIPTION,
          INPUT_UPDATE_EXPENSE_AMOUNT,
          INPUT_ADD_TAB,
          INPUT_ADD_TAB_PERSON,
          INPUT_UPDATE_TAB_PERSON_NAME,
          INPUT_ADD_TAB_RECORD,
          INPUT_ADD_PROJECTION_MONTH_YEAR,
          INPUT_ADD_PROJECTION_AMOUNT,
          INPUT_ADD_PROJECTION_DESCRIPTION } from "../shared/constants";



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
                          clearErrorMessage,
                          initialInput1 = "",
                          initialInput2 = "",
                          initialInput3 = ""}) => {
  const [userInput1, setUserInput1] = useState(initialInput1);
  const [userInput2, setUserInput2] = useState(initialInput2);
  const [userInput3, setUserInput3] = useState(initialInput3);
  const userInputRef1 = useRef(null);
  const userInputRef2 = useRef(null);
  const userInputRef3 = useRef(null);

  useEffect(() => {
    setUserInput1(initialInput1);
    setUserInput2(initialInput2);
    setUserInput3(initialInput3);
  }, [initialInput1, initialInput2, initialInput3, inputLabel]);


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
      case INPUT_ADD_TAB:
      case INPUT_ADD_TAB_PERSON:
      case INPUT_UPDATE_TAB_PERSON_NAME:
        updateToProvidedList(userInput1);
        break;
      case INPUT_ADD_EXPENSE:
      case INPUT_ADD_TAB_RECORD:
        updateToProvidedList(userInput1, userInput2);
        break;
      case INPUT_ADD_PROJECTION_MONTH_YEAR:
      case INPUT_ADD_PROJECTION_AMOUNT:
      case INPUT_ADD_PROJECTION_DESCRIPTION:
        updateToProvidedList(userInput1, userInput2, userInput3);
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

  const handleOnChangeInput3 = (val) => {
    console.log(val)
    setUserInput3(val);
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
    case INPUT_ADD_TAB:
    case INPUT_ADD_TAB_PERSON:
    case INPUT_UPDATE_TAB_PERSON_NAME:
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
    case INPUT_ADD_TAB_RECORD:
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
    case INPUT_ADD_PROJECTION_MONTH_YEAR:
    case INPUT_ADD_PROJECTION_AMOUNT:
    case INPUT_ADD_PROJECTION_DESCRIPTION:
      return (
        <div className="record-user-input-add-projection-div">
          <input 
            onChange={e => handleOnChangeInput1(e.target.value)}
            ref={userInputRef1}
            placeholder="Month-Year (YYYY-MM)"></input>
          <input 
            onChange={e => handleOnChangeInput2(e.target.value)}
            ref={userInputRef2}
            placeholder="Amount"></input>
          <input 
            onChange={e => handleOnChangeInput3(e.target.value)}
            ref={userInputRef3}
            placeholder="Description (Optional)"></input>
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
