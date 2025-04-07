import React, { useState } from "react";
import "./style.scss";
import RecordUserInput from "./RecordUserInput.jsx";
import {  INPUT_ADD_TAB_PERSON,
          BUTTON_LABEL_ADD_TAB_PERSON,
          INPUT_UPDATE_TAB_PERSON_NAME,
          BUTTON_UPDATE_TAB_NAME,
          INPUT_ADD_TAB_RECORD,
          BUTTON_ADD_TAB_RECORD } from "../shared/constants.js";
import {  addPersonToTabItem,
          readTabItems,
          updateTabName,
          deleteTab,
          addTabRecord } from "../shared/LocalStorageManager.js"


const TabCard = ({tabItem, setTabsList}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [personWhoOwes, setPersonWhoOwes] = useState("");
  const [personWhoIsOwed, setPersonWhoIsOwed] = useState("");



  const addToTabList = (val) => {
    addPersonToTabItem(tabItem.tabName, val);
    setTabsList(readTabItems());
  }

  const deleteThisTab = () => {
    deleteTab(tabItem.tabName);
    setTabsList(readTabItems());
  }

  const updateThisTabName = (val) => {
    updateTabName(tabItem.tabName, val);
    setTabsList(readTabItems());
  }

  const handlePersonWhoOwesChange = (e) => {
    setPersonWhoOwes(e.target.value);
    console.log(e.target.value);
  }

  const handlePersonWhoIsOwedChange = (e) => {
    setPersonWhoIsOwed(e.target.value);
    console.log(e.target.value);
  }


  const addToThisTabRecord = (description, amountOwed) => {
    console.log("debug!")
    if (personWhoOwes === personWhoIsOwed || personWhoOwes === "" || personWhoIsOwed === "") {
      setErrorMessage("Provide a valid input!");
      console.log(`${personWhoIsOwed} ${personWhoOwes}`)
    } else {
      addTabRecord(tabItem.tabName, personWhoOwes, personWhoIsOwed, description, amountOwed);
      setTabsList(readTabItems());
    }
  }

  const clearErrorMessage = () => {
    setErrorMessage("");
  }

  return (
    <div className="tab-card">
      <p>Tab: {tabItem.tabName}</p>
      <RecordUserInput
        inputLabel={INPUT_UPDATE_TAB_PERSON_NAME}
        updateToProvidedList={updateThisTabName}
        buttonLabel={BUTTON_UPDATE_TAB_NAME}
        errorMessage={errorMessage}
        clearErrorMessage={clearErrorMessage}/>
      <button onClick={deleteThisTab}>Delete</button>
      <p>Some kind of overview of who owes what</p>
      <p>Persons involved:</p>
      {tabItem.personsList.map((item, index) => (
        <div>
          <p>{item}</p>
        </div>
      ))}
      <RecordUserInput
        inputLabel={INPUT_ADD_TAB_PERSON}
        updateToProvidedList={addToTabList}
        buttonLabel={BUTTON_LABEL_ADD_TAB_PERSON}
        errorMessage={errorMessage}
        clearErrorMessage={clearErrorMessage}/>
      <p>Add Record</p>
      <select onChange={handlePersonWhoOwesChange}>
        {tabItem.personsList.map((item, index) => (
          <option value={item}>{item}</option>
        ))}
      </select> Owes 
      <select onChange={handlePersonWhoIsOwedChange}>
        {tabItem.personsList.map((item, index) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <RecordUserInput
        inputLabel={INPUT_ADD_TAB_RECORD}
        updateToProvidedList={addToThisTabRecord}
        buttonLabel={BUTTON_ADD_TAB_RECORD}
        errorMessage={errorMessage}
        clearErrorMessage={clearErrorMessage}/>
      {tabItem.tabRecordsList.map((item, index) => (
        <div>
          <p>{item.personWhoOwes} owes {item.personWhoIsOwed} ${item.amountOwed} : {item.description}</p>
        </div>
      ))}
    </div>
  )
}

export default TabCard;