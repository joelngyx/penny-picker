import React, { useState } from "react";
import "./style.scss";
import RecordUserInput from "./RecordUserInput.jsx";
import {  INPUT_ADD_PROJECTION_MONTH_YEAR,
          BUTTON_LABEL_UPDATE_PROJECTION } from "../shared/constants.js";


/** ========================================
 * This Component displays a Projection Item
 * and allows CRUD operations on it
 * @param {Object} projection 
 * @param {number} originalIndex 
 * @param {Function} onUpdate 
 * @param {Function} onDelete 
 * @returns {JSX}
======================================== */
const ProjectionCard = ({ projection, originalIndex, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editProjectionDetails, setEditProjectionDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  /** ==============================================================
   * Function to toggle edit projection details
   ============================================================== */
  const toggleEditProjectionDetails = () => {
    setEditProjectionDetails(!editProjectionDetails);
  }


  /** ==============================================================
   * Function to handle update button click
   ============================================================== */
  const handleUpdate = (monthYear, amount, description) => {
    if (monthYear.trim() === "" || amount.toString().trim() === "") {
      setErrorMessage("Please provide both month-year and amount");
      return;
    }

    const errorMsg = onUpdate(originalIndex, monthYear, amount, description);
    if (!errorMsg || errorMsg.includes("Updated")) {
      setIsEditing(false);
      setErrorMessage("");
    } else {
      setErrorMessage(errorMsg);
    }
  }


  /** ==============================================================
   * Function to handle delete button click
   ============================================================== */
  const handleDelete = () => {
    onDelete(originalIndex);
  }


  /** ==============================================================
   * Function to cancel editing
   ============================================================== */
  const handleCancel = () => {
    setIsEditing(false);
    setErrorMessage("");
  }


  return (
    <div className="projection-card">
      {isEditing ? (
        // ===== EDIT MODE =====
        <div className="projection-card-edit">
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          <RecordUserInput
            inputLabel={INPUT_ADD_PROJECTION_MONTH_YEAR}
            updateToProvidedList={handleUpdate}
            buttonLabel={BUTTON_LABEL_UPDATE_PROJECTION}
            errorMessage={errorMessage}
            clearErrorMessage={() => setErrorMessage("")}
            initialInput1={projection.monthYear}
            initialInput2={projection.amount.toString()}
            initialInput3={projection.description || ""}
          />

          <div className="button-group">
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // ===== DISPLAY MODE =====
        <div className="projection-card-display">
          <button className="projection-header"
            onClick={toggleEditProjectionDetails}>
            {projection.monthYear}          
          </button>
          {(editProjectionDetails === true) ? <></> : <button onClick={handleDelete}>Delete Projection</button>}
          <p>Amount Projected: ${projection.amount.toFixed(2)}</p>
          <p>Description: {projection.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectionCard;
