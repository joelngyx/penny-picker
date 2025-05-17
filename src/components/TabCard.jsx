import React, { useRef, useState } from "react";
import "./style.scss";
import RecordUserInput from "./RecordUserInput.jsx";
import TabRecordCard from "./TabRecordCard.jsx";
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
          addTabRecord,
          deleteNameFromTab,
          calculateTabBalanceForThisPerson } from "../shared/LocalStorageManager.js"


const TabCard = ({tabItem, setTabsList}) => {
  const [errorTabNameMessage, setErrorTabNameMessage] = useState("");
  const [errorAddPersonMessage, setErrorAddPersonMessage] = useState("");
  const [errorAddRecordMessage, setErrorAddRecordMessage] = useState("");
  const [errorDeletePersonName, setErrorDeletePersonName] = useState("");
  const [personWhoOwes, setPersonWhoOwes] = useState("");
  const [personWhoIsOwed, setPersonWhoIsOwed] = useState("");
  const personWhoOwesRef = useRef(null);
  const personWhoIsOwedRef = useRef(null);

  const setSelectRefs = () => {
    setPersonWhoOwes(personWhoOwesRef.current.value);
    setPersonWhoIsOwed(personWhoIsOwedRef.current.value);
  }

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
    setSelectRefs();
    if (personWhoOwes === personWhoIsOwed || personWhoOwes === "" || personWhoIsOwed === "") {
      setErrorAddRecordMessage("Invalid ");
      console.log(`${personWhoIsOwed} ${personWhoOwes}`)
    } else {
      addTabRecord(tabItem.tabName, personWhoOwes, personWhoIsOwed, description, amountOwed);
      setTabsList(readTabItems());
    }
  }

  const clearErrorTabNameMessage = () => {
    setErrorTabNameMessage("");
  }

  const clearErrorAddPersonMessage = () => {
    setErrorAddPersonMessage("");
  }

  const clearErrorAddRecordMessage = () => {
    setErrorAddRecordMessage("");
  }

  const deleteThisPersonFromTab = (val) => {
    let errorMsg = deleteNameFromTab(tabItem.tabName, val);
    setErrorDeletePersonName(errorMsg);
    setTabsList(readTabItems());
  }

  return (
    <div className="tab-card">
      <p>Tab: {tabItem.tabName}</p>
      <RecordUserInput
        inputLabel={INPUT_UPDATE_TAB_PERSON_NAME}
        updateToProvidedList={updateThisTabName}
        buttonLabel={BUTTON_UPDATE_TAB_NAME}
        errorMessage={errorTabNameMessage}
        clearErrorMessage={clearErrorTabNameMessage}/>
      <button onClick={deleteThisTab}>Delete</button>
      <p>Placeholder: Some kind of overview of who owes what</p>
      <p>Persons involved:</p>
      {tabItem.personsList.map((item, index) => (
        <div className="tab-person-info">
          <p>{item}</p> 
          <p>{calculateTabBalanceForThisPerson(tabItem.tabName, item)}</p>
          {calculateTabBalanceForThisPerson(tabItem.tabName, item) === 0.00 ?
            <button onClick={() => {deleteThisPersonFromTab(item)}}>Remove</button>:
            <></>}
        </div>
      ))}
      <p>{errorDeletePersonName}</p>
      <RecordUserInput
        inputLabel={INPUT_ADD_TAB_PERSON}
        updateToProvidedList={addToTabList}
        buttonLabel={BUTTON_LABEL_ADD_TAB_PERSON}
        errorMessage={errorAddPersonMessage}
        clearErrorMessage={clearErrorAddPersonMessage}/>
      <p>Add Record</p>
      <select onChange={handlePersonWhoOwesChange}
        ref={personWhoOwesRef} >
        {tabItem.personsList.map((item, index) => (
          <option value={item}>{item}</option>
        ))}
      </select> Owes 
      <select onChange={handlePersonWhoIsOwedChange}
        ref={personWhoIsOwedRef}>
        {tabItem.personsList.map((item, index) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <RecordUserInput
        inputLabel={INPUT_ADD_TAB_RECORD}
        updateToProvidedList={addToThisTabRecord}
        buttonLabel={BUTTON_ADD_TAB_RECORD}
        errorMessage={errorAddRecordMessage}
        clearErrorMessage={clearErrorAddRecordMessage}/>
      {tabItem.tabRecordsList.map((item, index) => (
        <div>
          {/* <p>{item.personWhoOwes} owes {item.personWhoIsOwed} ${item.amountOwed} : {item.description}</p> */}
          <TabRecordCard 
            tabName={tabItem.tabName}
            personWhoOwes={item.personWhoOwes} 
            personWhoIsOwed={item.personWhoIsOwed}
            amountOwed={item.amountOwed}
            description={item.description}
            dateTime={item.dateTime}
            index={index}
            setTabsList={setTabsList}/>
        </div>
      ))}
    </div>
  )
}

export default TabCard;