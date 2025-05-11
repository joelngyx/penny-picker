import React, { useState } from "react";
import "./style.scss";
import {  deleteTabRecord, 
          readTabItems } from "../shared/LocalStorageManager.js"



const TabRecordCard = ({tabName, personWhoOwes, personWhoIsOwed, amountOwed, description, dateTime, index, setTabsList}) => {
  const [editTabRecordDetails, setEditTabRecordDetails] = useState(false);

  const toggleEditTabRecordDetails = () => {
    setEditTabRecordDetails(prev => !prev);
  }

  const deleteThisTabRecord = () => {
    deleteTabRecord(tabName, index);
    setTabsList(readTabItems());
  }

  return (
    <div className="tab-record-card">
      <div className="tab-record-card-always-show">
        <div className="tab-record-card-person-who-owes-col">{personWhoOwes}</div>
        <div className="tab-record-card-arrow-col">{">"}</div>
        <div className="tab-record-card-person-who-is-owed-col">{personWhoIsOwed}</div>
        <div className="tab-record-card-amount-owed-col">{amountOwed}</div>
        <button className="edit" onClick={toggleEditTabRecordDetails}></button>
      </div>
      {(editTabRecordDetails === true) ?
        <div className="tab-record-card-edit-tab-record-details">
          <div>Description: {description}</div>
          <div>Date Added: {dateTime.split("T")[0]}</div>
          <button onClick={deleteThisTabRecord}>Delete</button>
        </div> : 
        <div></div>}
    </div>
  )
}

export default TabRecordCard;