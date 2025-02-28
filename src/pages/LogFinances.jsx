import React, { useState, useRef, useEffect } from "react";
import RecordUserInput from "../components/RecordUserInput";
import "./style.scss"
import { LOCAL_STORAGE_BUDGET_LIST, CARD_ADD_BUDGET } from "../shared/constants";



const LogFinances = () => {
  const [userInput, setUserInput] = useState("");
  const userInputRef = useRef(null);
  const [budgetsList, setBudgetsList] = useState([]);

  /**
   * To do:
   * 1. Retrieve localstorage data for Budgets, set to budgetsList
   */

  /**
   * This loads LocalStorage information
   */
  useEffect (() => {
    console.log(budgetsList)
    let localStorageBudgetList = localStorage.getItem(LOCAL_STORAGE_BUDGET_LIST);
    if (localStorageBudgetList === null) {
      setBudgetsList([]);
    } else {
      setBudgetsList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_BUDGET_LIST)));
    }
  }, [])

  const addToBudgetList = (val) => {
    let tempList = budgetsList;
    tempList.push(val);
    localStorage.setItem(LOCAL_STORAGE_BUDGET_LIST, JSON.stringify(tempList));
    setBudgetsList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_BUDGET_LIST)))
    console.log(localStorage.getItem(LOCAL_STORAGE_BUDGET_LIST))
  }

  return (
    <div className="log-finances-page">
      <div>Log Finances</div>
      <RecordUserInput 
        cardLabel={CARD_ADD_BUDGET}
        addToProvidedList={addToBudgetList}/>
      {budgetsList.map((item, index) => (
        <div key={index}>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default LogFinances;