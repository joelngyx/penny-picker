import React, { useState, useEffect } from "react";
import RecordUserInput from "../components/RecordUserInput.jsx";
import "./style.scss"
import {  INPUT_ADD_TAB,
          BUTTON_LABEL_ADD_TAB} from "../shared/constants.js";
import TabCard from "../components/TabCard.jsx";
import {  readTabItems, 
          createNewTabItem,
          exportAllTabDataAsJSONFile,
          importTabDataFromJSON } from "../shared/LocalStorageManager.js";



/** ============================================================
 * This Component displays a page for performing CRUD to Budgets
 * @returns {JSX}
 ============================================================ */
const RunningTabsPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [tabsList, setTabsList] = useState([]);
  const [importMessage, setImportMessage] = useState("");

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

  const downloadTabData = () => {
    const blob = exportAllTabDataAsJSONFile();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tab_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // eslint-disable-next-line 
  const clearImportMessage = () => {
    setImportMessage("");
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonData = e.target.result;
      const result = importTabDataFromJSON(jsonData);
      setImportMessage(result);
      if (result.includes("successfully")) {
        setTabsList(readTabItems()); // Refresh the list
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="running-tabs-page">
      <div className="running-tabs-upload-download-div">
        <button onClick={downloadTabData}>Download Tabs Data</button>
        <input 
          id="tab-file-input"
          type="file" 
          accept=".json" 
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="tab-file-input" style={{ cursor: 'pointer' }}>
          Upload Tabs Data 
        </label>
        {importMessage && <p style={{ paddingLeft: '25px', color: importMessage.includes("successfully") ? 'green' : 'red' }}>{importMessage}</p>}
      </div>
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