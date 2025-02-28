import React, { useState, useRef } from "react";
import "../shared/constants"
import "./style.scss"
import { CARD_ADD_BUDGET } from "../shared/constants";


/**
 * Expect props.
 */
const RecordUserInput = ({cardLabel, addToProvidedList}) => {
  const [userInput, setUserInput] = useState("");
  const userInputRef = useRef(null);

  const handleAddButton = () => {
    if (cardLabel === CARD_ADD_BUDGET) {
      addToProvidedList(userInput);
    }
  }


  return (
    <div className="record-user-input-div">
      <input 
        onChange={e => setUserInput(e.target.value)}
        ref={userInputRef}></input>
      <button onClick={handleAddButton}>Add</button>
      {userInput}
    </div>
  );
};

export default RecordUserInput;
