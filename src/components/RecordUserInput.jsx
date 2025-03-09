import React, { useState, useRef } from "react";
import "../shared/constants"
import "./style.scss"
import {  INPUT_ADD_BUDGET, 
          INPUT_ADD_EXPENSE, 
          INPUT_UPDATE_BUDGET_NAME,
          INPUT_UPDATE_BUDGET_AMOUNT,
          INPUT_UPDATE_EXPENSE_DESCRIPTION,
          INPUT_UPDATE_EXPENSE_AMOUNT } from "../shared/constants";


/**
 * 
 */
const RecordUserInput = ({inputLabel, 
                          updateToProvidedList, 
                          buttonLabel, 
                          errorMessage,
                          clearErrorMessage}) => {
  const [userInput1, setUserInput1] = useState("");
  const [userInput2, setUserInput2] = useState("");
  const userInputRef1 = useRef(null);
  const userInputRef2 = useRef(null);

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
        <div className="record-user-input-div">
          <input 
            onChange={e => handleOnChangeInput1(e.target.value)}
            ref={userInputRef1}></input>
          <input 
            onChange={e => handleOnChangeInput2(e.target.value)}
            ref={userInputRef2}></input>
          <button onClick={handleAddButton}>{buttonLabel}</button>
          <p>{errorMessage}</p>
        </div>
      )
    default:
      return (
        <div>Unknown</div>
      )
  }
};

export default RecordUserInput;
