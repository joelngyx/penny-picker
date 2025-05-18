import React, { useRef, useState } from "react";
import "./style.scss";
import RecordUserInput from "./RecordUserInput.jsx";
import TabRecordCard from "./TabRecordCard.jsx";
import {  INPUT_ADD_TAB_PERSON,
          BUTTON_LABEL_ADD_TAB_PERSON,
          INPUT_UPDATE_TAB_PERSON_NAME,
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
  const [isEditTab, setIsEditTab] = useState(false);
  const [isViewTabRecords, setIsViewTabRecords] = useState(false);
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
      setErrorAddRecordMessage("Invalid Input");
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

  const toggleEditTab = () => {
    if (isEditTab === true) {
      setIsEditTab(false);
    } else {
      setIsEditTab(true);
    }
  }

  const toggleViewTabRecords = () => {
    if (isViewTabRecords === true) {
      setIsViewTabRecords(false);
    } else {
      setIsViewTabRecords(true);
    }
  }

  return (
    <div className="tab-card">
      <button className="tab-card-edit-button" onClick={toggleEditTab}>
        {(isEditTab === false) ? `Tab: ${tabItem.tabName}` : "Hide"}</button>
      {(isEditTab) ? <>
        <RecordUserInput
          inputLabel={INPUT_UPDATE_TAB_PERSON_NAME}
          updateToProvidedList={updateThisTabName}
          // buttonLabel={BUTTON_UPDATE_TAB_NAME}
          buttonLabel={"Update Tab"}
          errorMessage={errorTabNameMessage}
          clearErrorMessage={clearErrorTabNameMessage}/>
        <RecordUserInput
          inputLabel={INPUT_ADD_TAB_PERSON}
          updateToProvidedList={addToTabList}
          buttonLabel={BUTTON_LABEL_ADD_TAB_PERSON}
          errorMessage={errorAddPersonMessage}
          clearErrorMessage={clearErrorAddPersonMessage}/>
        <button className="delete-tab-button" onClick={deleteThisTab}>Delete Tab</button></>: <></>}
 
      <p>Placeholder: Some kind of overview of who owes what</p>
      <p className="tab-person-header">Persons involved:</p>
      {tabItem.personsList.map((item, index) => (
        <div className="tab-person-info" key={index}>
          <p>{item}</p> 
          {
            parseFloat(calculateTabBalanceForThisPerson(tabItem.tabName, item)) > 0.00 ? (
              <p className="owed-p">
                is owed ${parseFloat(calculateTabBalanceForThisPerson(tabItem.tabName, item)).toFixed(2)}
              </p>
            ) : parseFloat(calculateTabBalanceForThisPerson(tabItem.tabName, item)) < 0.00 ? (
              <p className="owes-p">
                owes ${Math.abs(parseFloat(calculateTabBalanceForThisPerson(tabItem.tabName, item))).toFixed(2)}
              </p>
            ) : (
              <button onClick={() => {deleteThisPersonFromTab(item)}}>Remove</button>
            )
          }
        </div>
      ))}
      <p>{errorDeletePersonName}</p>

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
      <button onClick={toggleViewTabRecords}>
        {(isViewTabRecords === false) ? 
          "View Tab Records": 
          "Hide Records"}</button>
      {(isViewTabRecords === true) ?
        <><div className="gap"></div>
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
        ))}</>
      : 
        <div className="gap"></div>}
      
    </div>
  )
}

export default TabCard;