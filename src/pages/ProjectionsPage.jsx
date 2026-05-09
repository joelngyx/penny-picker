import React, { useState, useEffect } from "react";
import RecordUserInput from "../components/RecordUserInput.jsx";
import ProjectionCard from "../components/ProjectionCard.jsx";
import "./style.scss"
import {  INPUT_ADD_PROJECTION_MONTH_YEAR,
          BUTTON_LABEL_ADD_PROJECTION } from "../shared/constants.js";
import {  readProjectionItems, 
          createProjectionItem,
          updateProjectionItem,
          deleteProjectionItem } from "../shared/LocalStorageManager.js";



/** ============================================================
 * This Component displays a page for performing CRUD to Projections
 * @returns {JSX}
 ============================================================ */
const ProjectionsPage = () => {
  const [projectionsList, setProjectionsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalNetWorth, setTotalNetWorth] = useState(0);
  const [latestMonthYear, setLatestMonthYear] = useState("");


  /** ===================================================================
   * Load the ProjectionItems when the ProjectionsPage React Component is mounted
   =================================================================== */
  useEffect (() => {
    let localStorageProjectionList = readProjectionItems();
    setProjectionsList(localStorageProjectionList);
    calculateNetWorth(localStorageProjectionList);
  }, [])


  /** ==============================================================
   * Function to calculate total net worth and find latest month-year
   * The net worth should be the sum of all projections up to and 
   * including the latest month-year
   ============================================================== */
  const calculateNetWorth = (projections) => {
    if (projections.length === 0) {
      setTotalNetWorth(0);
      setLatestMonthYear("");
      return;
    }

    // Find the latest month-year (sort descending and take first)
    const sortedByMonth = [...projections].sort((a, b) => 
      b.monthYear.localeCompare(a.monthYear)
    );
    
    const latest = sortedByMonth[0].monthYear;
    setLatestMonthYear(latest);

    // Sum all amounts up to and including the latest month
    const total = projections.reduce((sum, projection) => {
      return sum + projection.amount;
    }, 0);

    setTotalNetWorth(total);
  }


  /** =============================================================
   * Function to sort projections by month-year (latest to earliest)
   ============================================================= */
  const sortProjectionsByMonthYear = (projections) => {
    return [...projections].sort((a, b) => 
      b.monthYear.localeCompare(a.monthYear)
    );
  }


  /** =============================================================
   * Function to create a new Projection Item and add it to projectionsList
   ============================================================= */
  const addToProjectionList = (monthYear, amount, description) => {
    let errorMsg = createProjectionItem(monthYear, amount, description);
    
    if (errorMsg.includes("Created") || errorMsg.includes("Updated")) {
      setErrorMessage("");
      let updatedList = readProjectionItems();
      setProjectionsList(updatedList);
      calculateNetWorth(updatedList);
    } else {
      setErrorMessage(errorMsg);
    }
  }


  /** ==============================================================
   * Function to update a Projection Item
   ============================================================== */
  const updateProjection = (index, monthYear, amount, description) => {
    let errorMsg = updateProjectionItem(index, monthYear, amount, description);
    
    if (errorMsg.includes("Updated")) {
      setErrorMessage("");
      let updatedList = readProjectionItems();
      setProjectionsList(updatedList);
      calculateNetWorth(updatedList);
    } else {
      setErrorMessage(errorMsg);
    }

    return errorMsg;
  }


  /** ==============================================================
   * Function to delete a Projection Item
   ============================================================== */
  const deleteProjection = (index) => {
    deleteProjectionItem(index);
    let updatedList = readProjectionItems();
    setProjectionsList(updatedList);
    calculateNetWorth(updatedList);
    setErrorMessage("");
  }


  /** ==============================================================
   * Function to clear error messages
   ============================================================== */
  const clearErrorMessage = () => {
    setErrorMessage("");
  }


  return (
    <div className="projections-page">
      
      {/* ===== Net Worth Display ===== */}
      <div className="net-worth-div">
        {latestMonthYear ? (
          <div>
            <p>Projected Net Worth by {latestMonthYear}</p>
            <p className="net-worth-amount">${totalNetWorth.toFixed(2)}</p>
          </div>
        ) : (
          <p>No projections yet</p>
        )}
      </div>

      {/* ===== Input Form for Creating New Projection ===== */}
      <RecordUserInput 
        inputLabel={INPUT_ADD_PROJECTION_MONTH_YEAR}
        updateToProvidedList={addToProjectionList}
        buttonLabel={BUTTON_LABEL_ADD_PROJECTION}
        errorMessage={errorMessage}
        clearErrorMessage={clearErrorMessage}
      />

      {/* ===== Projection Cards (Sorted by Month-Year) ===== */}
      <div className="projections-list">
        {projectionsList.length === 0 ? (
          <p className="no-projections">No projections yet.</p>
        ) : (
          sortProjectionsByMonthYear(projectionsList).map((projection, index) => (
            <ProjectionCard
              key={index}
              projection={projection}
              originalIndex={projectionsList.indexOf(projection)}
              onUpdate={updateProjection}
              onDelete={deleteProjection}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectionsPage;