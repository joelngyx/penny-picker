import React, { useState, useEffect } from "react";
import RecordUserInput from "../components/RecordUserInput.jsx";
import "./style.scss"
import {  INPUT_ADD_TAB,
          BUTTON_LABEL_ADD_TAB} from "../shared/constants.js";
import TabCard from "../components/TabCard.jsx";
import {  readTabItems, 
          createNewTabItem } from "../shared/LocalStorageManager.js";



/** ============================================================
 * This Component displays a page for performing CRUD to Budgets
 * @returns {JSX}
 ============================================================ */
const RunningTabsPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [tabsList, setTabsList] = useState([]);

  useEffect (() => {
      let localStorageTabList = readTabItems();
      setTabsList(localStorageTabList);
    }, [])

  const addToTabList = (val) => {
    let errorMessage = createNewTabItem(val);
    setErrorMessage(errorMessage);
    setTabsList(readTabItems());
  }

  /** ==============================================================
   * Function to clear error messages. Such error messages displayed
   * are based on the User's input. 
   * This function is passed to the RecordUserInput component
   ============================================================== */
  const clearErrorMessage = () => {
    setErrorMessage("");
  }

  return (
    <div className="running-tabs-page">
      <div className="running-tabs-page-add-tab-div">
        <RecordUserInput
          inputLabel={INPUT_ADD_TAB}
          updateToProvidedList={addToTabList}
          buttonLabel={BUTTON_LABEL_ADD_TAB}
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          />
      </div>

      <div className="tab-list-div">
        {tabsList.map((item, index) => (
          <TabCard key={index} tabItem={item} setTabsList={setTabsList}/>
        ))}
      </div>
    </div>)
}

export default RunningTabsPage;