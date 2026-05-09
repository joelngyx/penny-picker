import {  LOCAL_STORAGE_BUDGET_LIST, 
          LOCAL_STORAGE_TABS_LIST,
          LOCAL_STORAGE_PROJECTIONS_LIST } from "../shared/constants";
import { ComputeArithmetic } from "./Utility";


/** ================= CONSTANTS ================= */
const ERROR_MESSAGE_EMPTY_STRING = "Please provide a non-empty input";
const ERROR_MESSAGE_DUPLICATE_BUDGET_NAME = "Duplicate Budget names are not allowed";
const ERROR_MESSAGE_DUPLICATE_TAB_NAME = "Duplicate Tab names are not allowed";
const SUCCESS_MESSAGE_BUDGET_ITEM_CREATED = "Created a new Budget!"
const ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT = "Please provide a numeric input";
const SUCCESS_MESSAGE_BUDGET_UPDATED = "Updated the Budget!";
const SUCCESS_MESSAGE_EXPENSE_ITEM_CREATED = "Logged an Expense!";
const SUCCESS_MESSAGE_EXPENSE_ITEM_UPDATED = "Updated an Expense!";
const SUCCESS_MESSAGE_TAB_ITEM_CREATED = "Created a new Tab!";
const ERROR_MESSAGE_DUPLICATE_TAB_PERSON_NAME = "Duplicate names are not allowed";
const SUCCESS_MESSAGE_TAB_ITEM_PERSON_ADDED = "Added a person to this Tab!"
const SUCCESS_MESSAGE_TAB_RECORD_ADDED = "Added a Record to this Tab!";
const ERROR_MESSAGE_CANNOT_DELETE_NAME_WITH_EXISTING_TAB_RECORDS = "Unable to delete this name from this tab as there are records with this name";
const SUCCESS_MESSAGE_PROJECTION_ITEM_CREATED = "Created a new Projection!";
const SUCCESS_MESSAGE_PROJECTION_ITEM_UPDATED = "Updated the Projection!";
const ERROR_MESSAGE_INVALID_MONTH_YEAR_FORMAT = "Please provide a valid month-year format (e.g., 2026-05)";
const ERROR_MESSAGE_DUPLICATE_PROJECTION_MONTH_YEAR = "A projection for this month-year already exists";



/** ================================== BUDGET-RELATED FUNCTIONS ================================== */
/** ===========================================
 * This function returns a list of Budget Items
 * @returns {Object[]}
 =========================================== */
export const readBudgetItems = () => {
  let localStorageBudgetItemList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BUDGET_LIST));

  if (localStorageBudgetItemList === null) {
    return [];
  } else {
    return localStorageBudgetItemList;
  }
}

/** ===========================================
 * This function returns a list of Budget Names
 * @returns {string[]}
 =========================================== */
export const readBudgetNames = () => {
  let localStorageBudgetItemList = readBudgetItems();

  if (localStorageBudgetItemList === null) {
    return [];
  }

  let resultList = [];

  for (let i = 0; i < localStorageBudgetItemList.length; i++) {
    let budgetName = localStorageBudgetItemList[i].budgetName;
    resultList.push(budgetName);
  }

  return resultList;
}

/** ========================================================
 * This function sets a list of Budget Items to LocalStorage
 * @param {Object[]} val 
 ======================================================== */
 export const setBudgets = (val) => {
  localStorage.setItem(LOCAL_STORAGE_BUDGET_LIST, JSON.stringify(val));
}

/** =========================================================
 * This function adds a new Budget Item to LocalStorage and  
 * returns a message to indicate if the action was successful
 * @param {string} val 
 * @returns {string}
 ========================================================= */
export const createNewBudgetItem = (val) => {
  // ===== 1. Ensure that the Budget Name is not an empty string =====
  if (isStringEmpty(val) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Ensure that Budget names are unique =====
  let listOfBudgetNames = readBudgetNames();
  for (let i = 0; i < listOfBudgetNames.length; i++) {
    let existingbudgetName = listOfBudgetNames[i].replaceAll(" ", "");
    if (existingbudgetName === val.replaceAll(" ", "")) {
      return ERROR_MESSAGE_DUPLICATE_BUDGET_NAME;
    }
  }

  // ===== 3. Create a new Budget Item =====
  let newBudgetItem = {};
  newBudgetItem.budgetName = val;
  newBudgetItem.budgetAmount = parseFloat(0.00);
  newBudgetItem.expenseList = [];

  let listOfBudgetItems = readBudgetItems();
  listOfBudgetItems.push(newBudgetItem);
  setBudgets(listOfBudgetItems);
  return SUCCESS_MESSAGE_BUDGET_ITEM_CREATED;
}

/** =======================================================
 * This function deletes all Budget Items from LocalStorage
 ======================================================= */
export const deleteAllBudgetItems = () => {
  localStorage.clear();
}

/** ========================================================
 * This function updates a BudgetItem's allocated amount and
 * returns a message indicating if the action was successful
 * @param {*} budgetName 
 * @param {*} updatedBudgetAmount 
 * @returns {string}
 ======================================================== */
export const updateBudgetAmount = (budgetName, updatedBudgetAmount) => {
  // ===== 1. Ensure that the updatedBudgetAmount is valid =====
  if (isNaN(parseFloat(updatedBudgetAmount)) === true) {
    return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
  }

  if (isStringEmpty(updatedBudgetAmount) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Update the relevant BudgetItem =====
  let listOfBudgetItems = readBudgetItems();
  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];
    if (budgetItem.budgetName === budgetName) {
      budgetItem.budgetAmount = updatedBudgetAmount;
    }
  }

  // ===== 3. Update LocalStorage =====
  setBudgets(listOfBudgetItems);
  return SUCCESS_MESSAGE_BUDGET_UPDATED;
}

/** ============================================
 * This function updates a BudgetItem's Name and
 * returns a message indicating if the action 
 * was successful
 * @param {*} budgetName 
 * @param {*} updatedBudgetName 
 * @returns {string}
 ============================================ */
export const updateBudgetName = (budgetName, updatedBudgetName) => {
  // ===== 1. Ensure that the Budget Name is not an empty string =====
  if (isStringEmpty(updatedBudgetName) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Ensure that Budget names are unique =====
  let listOfBudgetNames = readBudgetNames();
  
  for (let i = 0; i < listOfBudgetNames.length; i++) {
    let existingbudgetName = listOfBudgetNames[i].replaceAll(" ", "");
    if (existingbudgetName === updatedBudgetName.replaceAll(" ", "")) {
      return ERROR_MESSAGE_DUPLICATE_BUDGET_NAME;
    }
  }

  // ===== 3. Update the relevant BudgetItem =====
  let listOfBudgetItems = readBudgetItems();
  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];
    if (budgetItem.budgetName === budgetName) {
      budgetItem.budgetName = updatedBudgetName;
    }
  }

  // ===== 4. Update LocalStorage =====
  setBudgets(listOfBudgetItems);
  return SUCCESS_MESSAGE_BUDGET_UPDATED;
}

/** ===========================================
 * This function deletes a specified BudgetItem
 * @param {*} budgetName 
 * @param {*} index 
 =========================================== */
export const deleteBudgetItem = (budgetName, index) => {
  let listOfBudgetItems = readBudgetItems();

  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];

    if (budgetItem.budgetName === budgetName) {
      listOfBudgetItems.splice(i, 1);
      break;
    }
  }

  setBudgets(listOfBudgetItems);
}



/** ================================== BUDGET-EXPENSE-RELATED FUNCTIONS ================================== */
/** =========================================================
 * This function returns a specified BudgetItem's ExpenseList
 * from LocalStorage
 * @param {*} budgetName 
 * @returns {Object[]}
 ========================================================= */
export const readBudgetItemExpenseList = (budgetName) => {
  let listOfBudgetItems = readBudgetItems();
  let resultList = [];

  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];
    
    if (budgetItem.budgetName === budgetName) {
      resultList = budgetItem.expenseList;
    }
  }

  return resultList;
}

/** ==============================================================
 * This function adds an ExpenseItem to a BudgetItem's ExpenseList
 * and returns a message indicating if the action was successful
 * @param {*} budgetName 
 * @param {*} expenseDescription 
 * @param {*} expenseAmount 
 ============================================================== */
export const addBudgetItemExpenseItem = (budgetName, expenseDescription, expenseAmount) => {
  // ===== 1. Ensure that the Expense Description is not an empty string =====
  if (isStringEmpty(expenseAmount) === true || isStringEmpty(expenseDescription)) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  if (isStringContainingAlphabetCharacters(expenseAmount) === false) {
    return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
  }

  if (expenseAmount.toString().charAt(0) === "=") {
    let computedExpenseAmount = ComputeArithmetic(expenseAmount);
    if (isNaN(computedExpenseAmount) === true || computedExpenseAmount === null) {
      return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
    } else {
      expenseAmount = computedExpenseAmount;
    }
  }

  // ===== 2. Ensure that the Expense Amount is a numeric value =====
  if (isNaN(parseFloat(expenseAmount)) === true || isStringNumeric(expenseAmount) === false) {
    return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
  }

  // ===== 3. Create ExpenseItem and add it to the specified BudgetItem's ExpenseList =====
  let listOfBudgetItems = readBudgetItems();

  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];

    if (budgetItem.budgetName === budgetName) {
      const now = new Date();

      let expenseItem = {}
      expenseItem.expenseDescription = expenseDescription;
      expenseItem.expenseAmount = expenseAmount;
      expenseItem.dateTime = now;
      budgetItem.expenseList.push(expenseItem);

      break;
    }
  }

  // ===== 4. Update LocalStorage =====
  setBudgets(listOfBudgetItems);
  // let totalSize = 0;
  
  // for (let key in localStorage) {
  //   if (localStorage.hasOwnProperty(key)) {
  //     totalSize += ((localStorage[key].length + key.length) * 2); // Each character ~2 bytes (UTF-16)
  //   }
  // }

  // console.log(`Total LocalStorage Size: ${totalSize} bytes (~${(totalSize / 1024).toFixed(2)} KB)`);
  return SUCCESS_MESSAGE_EXPENSE_ITEM_CREATED;
}

/** ============================================================================
 * This function deletes a specified ExpenseItem from a BudgetItem's ExpenseList
 * @param {*} budgetName 
 * @param {*} index 
 ============================================================================ */
export const deleteBudgetItemExpenseItem = (budgetName, index) => {
  let listOfBudgetItems = readBudgetItems();

  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];

    if (budgetItem.budgetName === budgetName) {
      budgetItem.expenseList.splice(index, 1);
      break;
    }
  }

  setBudgets(listOfBudgetItems);
}

/** ============================================================
 * This function updates a specified ExpenseItem's Description
 * and returns a message indicating if the action was successful
 * @param {*} budgetName 
 * @param {*} index 
 * @param {*} updatedExpenseDescription 
 * @returns {string}
 ============================================================ */
export const updateBudgetItemExpenseItemDescription = (budgetName, index, updatedExpenseDescription) => {
  // ===== 1. Ensure that the Expense Description is not an empty string =====
  if (isStringEmpty(updatedExpenseDescription) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Update the specificed ExpenseItem =====
  let listOfBudgetItems = readBudgetItems();

  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];

    if (budgetItem.budgetName === budgetName) {
      for (let j = 0; j < budgetItem.expenseList.length; j++) {
        if (j === index) {
          let expenseItem = budgetItem.expenseList[j];
          expenseItem.expenseDescription = updatedExpenseDescription;
          break;
        }
      }
      break;
    }
  }

  setBudgets(listOfBudgetItems);
  return SUCCESS_MESSAGE_EXPENSE_ITEM_UPDATED;
}

/** =========================================================
 * This function updates a specified ExpenseItem's Amount and
 * returns a message indicating if the action was successful
 * @param {*} budgetName 
 * @param {*} index 
 * @param {*} updatedExpenseAmount 
 * @returns {string}
 ========================================================= */
export const updateBudgetItemExpenseItemAmount = (budgetName, index, updatedExpenseAmount) => {
  // ===== 1. Ensure that the Expense Amount is a numeric value =====
  if (isNaN(parseFloat(updatedExpenseAmount)) === true) {
    return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
  }

  if (isStringEmpty(updatedExpenseAmount) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Update the specificed ExpenseItem =====
  let listOfBudgetItems = readBudgetItems();

  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];

    if (budgetItem.budgetName === budgetName) {
      for (let j = 0; j < budgetItem.expenseList.length; j++) {
        if (j === index) {
          let expenseItem = budgetItem.expenseList[j];
          expenseItem.expenseAmount = updatedExpenseAmount;
          break;
        }
      }
      break;
    }
  }

  setBudgets(listOfBudgetItems);
  return SUCCESS_MESSAGE_EXPENSE_ITEM_UPDATED;
}

/** =================================================
 * This function returns the sum of the total expense
 * of a specified budget for a specified month
 * @param {*} yearMonth 
 * @param {*} budgetName 
 * @returns {Float}
 ================================================= */
export const computeTotalExpenseForABudgetForAGivenMonth = (yearMonth, budgetName) => {
  let result = 0;
  let listOfBudgetItems = readBudgetItems();

  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];

    if (budgetItem.budgetName === budgetName) {
      for (let j = 0; j < budgetItem.expenseList.length; j++) {
        if (budgetItem.expenseList[j].dateTime.includes(yearMonth)) {
          result = result + parseFloat(budgetItem.expenseList[j].expenseAmount);
        }
      }
      break;
    }
  }

  return result.toFixed(2);
}



/** ================================== TAB-RELATED FUNCTIONS ================================== */
/** ===========================================
 * This function returns a list of Budget Items
 * @returns {Object[]}
 =========================================== */
export const readTabItems = () => {
  let localStorageTabItemList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TABS_LIST));

  if (localStorageTabItemList === null) {
    return [];
  } else {
    return localStorageTabItemList;
  }
}

/** ======================================================
 * This function returns a list comprising all Tabs' names
 * @returns {String[]}
 ====================================================== */
export const readTabNames = () => {
  let localStorageTabItemList = readTabItems();

  if (localStorageTabItemList === null) {
    return [];
  }

  let resultList = [];

  for (let i = 0; i < localStorageTabItemList.length; i++) {
    let tabName = localStorageTabItemList[i].tabName;
    resultList.push(tabName);
  }

  return resultList;
}

/** ========================================================
 * This function sets a list of Budget Items to LocalStorage
 * @param {Object[]} val 
 ======================================================== */
 export const setTabs = (val) => {
  localStorage.setItem(LOCAL_STORAGE_TABS_LIST, JSON.stringify(val));
}

/** ===================================
 * This function returns a new Tab Item
 * @param {*} val 
 * A Tab Item should have:
 * 1. Name (unique)
 * 2. PersonsList (unique entries) 
  - will have user by default as "You"
 * 3. TabItemList
   Each tab item has:
    i. Person XX (who owes money)
    ii. Person YY (who is owed money)
    iii. Description 
    iv. Amount
    v. Datetime
 * @returns {String}
 =================================== */
export const createNewTabItem = (val) => {
  // ===== 1. Ensure that the Tab Name is not an empty string =====
  if (isStringEmpty(val) === true || isStringEmpty(val) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Ensure that Tab Name is unique =====
  let listOfTabNames = readTabNames();
  for (let i = 0; i < listOfTabNames.length; i++) {
    let existingTabName = listOfTabNames[i].replaceAll(" ", "");
    if (existingTabName === val.replaceAll(" ", "")) {
      return ERROR_MESSAGE_DUPLICATE_TAB_NAME;
    }
  }

  // ===== 3. Create a new Tab Item =====
  let newTabItem = {};
  newTabItem.tabName = val;
  newTabItem.personsList = ["You"];
  newTabItem.tabRecordsList = [];

  let listOfTabItems = readTabItems();
  listOfTabItems.push(newTabItem);
  setTabs(listOfTabItems);
  return SUCCESS_MESSAGE_TAB_ITEM_CREATED;
}

/** ====================================
 * This function adds a Person's name to 
 * a specified Tab Item's personsList
 * @param {*} tabName 
 * @param {*} personToAddName 
 * @returns {String}
 ==================================== */
export const addPersonToTabItem = (tabName, personToAddName) => {
  if (isStringEmpty(tabName) === true || isStringEmpty(personToAddName) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 1. Ensure that personToAddName is unique in tab indicated by tabName
  let localStorageTabItemList = readTabItems();

  for (let i = 0; i < localStorageTabItemList.length; i ++) {
    let tabItem = localStorageTabItemList[i];

    if (tabItem.tabName === tabName) {
      for (let j = 0; j < tabItem.personsList.length; j ++) {
        if (personToAddName === tabItem.personsList[j]) {
          return ERROR_MESSAGE_DUPLICATE_TAB_PERSON_NAME;
        }
      }
      tabItem.personsList.push(personToAddName);
    }
  }
  
  setTabs(localStorageTabItemList);
  return SUCCESS_MESSAGE_TAB_ITEM_PERSON_ADDED;
}

/** ================================================
 * This function updates a specified Tab Item's name
 * @param {*} oldTabName 
 * @param {*} newTabName 
 * @returns {String}
 ================================================ */
export const updateTabName = (oldTabName, newTabName) => {
  if (isStringEmpty(newTabName) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }
  
  let localStorageTabItemList = readTabItems();

  for (let i = 0; i < localStorageTabItemList.length; i ++) {
    let tabItem = localStorageTabItemList[i];

    if (tabItem.tabName === newTabName) {
      return ERROR_MESSAGE_DUPLICATE_TAB_NAME;
    }
  }

  for (let i = 0; i < localStorageTabItemList.length; i ++) {
    let tabItem = localStorageTabItemList[i];

    if (tabItem.tabName === oldTabName) {
      tabItem.tabName = newTabName;
    }
  }
  
  setTabs(localStorageTabItemList);
  return SUCCESS_MESSAGE_TAB_ITEM_CREATED;
}

/** =========================================
 * This function deletes a specified Tab Item
 * @param {*} tabName 
 ========================================= */
export const deleteTab = (tabName) => {
  let localStorageTabItemList = readTabItems();

  for (let i = 0; i < localStorageTabItemList.length; i ++) {
    let tabItem = localStorageTabItemList[i];

    if (tabItem.tabName === tabName) {
      localStorageTabItemList.splice(i, 1);
      break;
    }
  }

  setTabs(localStorageTabItemList);
}

/** =================================
 * This function creates a Tab Record
 * @param {*} tabName 
 * @param {*} personWhoOwesMoney 
 * @param {*} personWhoIsOwedMoney 
 * @param {*} description 
 * @param {*} amountOwed 
 * @returns 
 ================================= */
export const addTabRecord = (tabName, personWhoOwesMoney, personWhoIsOwedMoney, description, amountOwed) => {  
  if (isStringContainingAlphabetCharacters(amountOwed) === false) {
    return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT; 
  }

  if (amountOwed.toString().charAt(0) === "=") {
    let computedAmountOwed = ComputeArithmetic(amountOwed);
    if (isNaN(computedAmountOwed) === true || computedAmountOwed === null) {
      return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
    } else {
      amountOwed = computedAmountOwed;
    }
  }

  // ===== 2. Ensure that the Expense Amount is a numeric value =====
  if (isNaN(parseFloat(amountOwed)) === true || isStringNumeric(amountOwed) === false) {
    return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
  }

  const now = new Date();
  let localStorageTabItemList = readTabItems();

  for (let i = 0; i < localStorageTabItemList.length; i ++) {
    let tabItem = localStorageTabItemList[i];

    if (tabItem.tabName === tabName) {
      let tabRecordItem = {}
      tabRecordItem["personWhoOwes"] = personWhoOwesMoney;
      tabRecordItem["personWhoIsOwed"] = personWhoIsOwedMoney;
      tabRecordItem["description"] = description;
      tabRecordItem["amountOwed"] = amountOwed;
      tabRecordItem["dateTime"] = now;

      tabItem.tabRecordsList.push(tabRecordItem);
    }
  }

  setTabs(localStorageTabItemList);
  return SUCCESS_MESSAGE_TAB_RECORD_ADDED;
}

/**
 * 
 * @param {*} tabName 
 * @param {*} index 
 */
export const deleteTabRecord = (tabName, index) => {
  let listOfTabItems = readTabItems();

  for (let i = 0; i < listOfTabItems.length; i ++) {
    let tabItem = listOfTabItems[i];
    if (tabItem.tabName === tabName) {
      tabItem.tabRecordsList.splice(index, 1);
      break;
    }
  }

  setTabs(listOfTabItems);
}



export const deleteNameFromTab = (tabName, nameToDelete) => {
  let listOfTabItems = readTabItems();
  // Cannot delete if this person has tab records
  for (let i = 0; i < listOfTabItems.length; i ++) {
    let tabItem = listOfTabItems[i];
    if (tabItem.tabName === tabName) {
      for (let j = 0; j < tabItem.tabRecordsList.length; j ++) {
        if (tabItem.tabRecordsList[j].personWhoIsOwed === nameToDelete || tabItem.tabRecordsList[j].personWhoOwes === nameToDelete) {
          return ERROR_MESSAGE_CANNOT_DELETE_NAME_WITH_EXISTING_TAB_RECORDS;
        }
      }
      
      for (let k = 0; k < tabItem.personsList.length; k++) {
        if (tabItem.personsList[k] === nameToDelete) {
          tabItem.personsList.splice(k, 1);
          break;
        }
      }
    }
  }

  setTabs(listOfTabItems);
}



export const calculateTabBalanceForThisPerson = (tabName, personName) => {
  let listOfTabItems = readTabItems();
  let balance = parseFloat(0.00);

  for (let i = 0; i < listOfTabItems.length; i ++) {
    let tabItem = listOfTabItems[i];
    if (tabItem.tabName === tabName) {
      for (let k = 0; k < tabItem.tabRecordsList.length; k ++) {
        if (tabItem.tabRecordsList[k].personWhoIsOwed === personName) {
          balance = parseFloat(balance) + parseFloat(tabItem.tabRecordsList[k].amountOwed);
        } else if (tabItem.tabRecordsList[k].personWhoOwes === personName) {
          balance = parseFloat(balance) - parseFloat(tabItem.tabRecordsList[k].amountOwed);
        }
      }
      break;
    }
  }

  return balance;
}

/** ===========================================
 * This function exports all budget and expense data as a JSON Blob
 * @returns {Blob} A Blob containing the JSON data
 =========================================== */
export const exportAllBudgetAndExpenseDataAsJSONFile = () => {
  const budgetData = readBudgetItems();
  const jsonData = JSON.stringify(budgetData, null, 2);
  return new Blob([jsonData], { type: 'application/json' });
}

/** ===========================================
 * This function exports all tab data as a JSON Blob
 * @returns {Blob} A Blob containing the JSON data
 =========================================== */
export const exportAllTabDataAsJSONFile = () => {
  const tabData = readTabItems();
  const jsonData = JSON.stringify(tabData, null, 2);
  return new Blob([jsonData], { type: 'application/json' });
}
export const importBudgetAndExpenseDataFromJSON = (jsonData) => {
  try {
    const parsedData = JSON.parse(jsonData);
    
    // Validate that it's an array of budget items
    if (!Array.isArray(parsedData)) {
      return "Invalid data format: Expected an array of budget items";
    }
    
    // Basic validation of structure
    for (const item of parsedData) {
      if (!item.budgetName || typeof item.budgetAmount === 'undefined' || !Array.isArray(item.expenseList)) {
        return "Invalid data format: Budget items must have budgetName, budgetAmount, and expenseList";
      }
    }
    
    setBudgets(parsedData);
    return "Budget and expense data imported successfully!";
  } catch (error) {
    return "Error parsing JSON data: " + error.message;
  }
}

/** ===========================================
 * This function imports tab data from a JSON string
 * @param {string} jsonData - The JSON string containing tab data
 * @returns {string} Success or error message
 =========================================== */
export const importTabDataFromJSON = (jsonData) => {
  try {
    const parsedData = JSON.parse(jsonData);
    
    // Validate that it's an array of tab items
    if (!Array.isArray(parsedData)) {
      return "Invalid data format: Expected an array of tab items";
    }
    
    // Basic validation of structure
    for (const item of parsedData) {
      if (!item.tabName || !Array.isArray(item.personsList) || !Array.isArray(item.tabRecordsList)) {
        return "Invalid data format: Tab items must have tabName, personsList, and tabRecordsList";
      }
    }
    
    setTabs(parsedData);
    return "Tab data imported successfully!";
  } catch (error) {
    return "Error parsing JSON data: " + error.message;
  }
}



// export const resolveTabPayment = (tabName) => {
//   let listOfTabItems = readTabItems();

//   for (let i = 0; i < listOfTabItems.length; i ++) {
//     let tabItem = listOfTabItems[i];
//     if (tabItem.tabName === tabName) {
//       for (let j = 0; j < tabItem.personsList.length; j ++) {
//         c
//       }
//     }
//   } 
// }



/** ================================== PROJECTION-RELATED FUNCTIONS ================================== */
/** ===========================================
 * This function returns a list of Projection Items
 * @returns {Object[]}
 =========================================== */
export const readProjectionItems = () => {
  let localStorageProjectionItemList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTIONS_LIST));

  if (localStorageProjectionItemList === null) {
    return [];
  } else {
    return localStorageProjectionItemList;
  }
}

/** ========================================================
 * This function sets a list of Projection Items to LocalStorage
 * @param {Object[]} val 
 ======================================================== */
export const setProjections = (val) => {
  localStorage.setItem(LOCAL_STORAGE_PROJECTIONS_LIST, JSON.stringify(val));
}

/** =========================================================
 * This function adds a new Projection Item to LocalStorage and  
 * returns a message to indicate if the action was successful
 * @param {string} monthYear - Format: YYYY-MM
 * @param {number} amount - Expected income amount
 * @param {string} description - Optional description
 * @returns {string}
 ========================================================= */
export const createProjectionItem = (monthYear, amount, description) => {
  // ===== 1. Ensure that monthYear is provided and in valid format =====
  if (isStringEmpty(monthYear) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  const monthYearRegex = /^\d{4}-\d{2}$/;
  if (!monthYearRegex.test(monthYear)) {
    return ERROR_MESSAGE_INVALID_MONTH_YEAR_FORMAT;
  }

  // ===== 2. Ensure that amount is a valid numeric value =====
  if (isNaN(parseFloat(amount)) === true || isStringEmpty(amount) === true) {
    return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
  }

  // ===== 3. Ensure that monthYear is unique =====
  let listOfProjectionItems = readProjectionItems();
  for (let i = 0; i < listOfProjectionItems.length; i++) {
    if (listOfProjectionItems[i].monthYear === monthYear) {
      return ERROR_MESSAGE_DUPLICATE_PROJECTION_MONTH_YEAR;
    }
  }

  // ===== 4. Create a new Projection Item =====
  let newProjectionItem = {};
  newProjectionItem.monthYear = monthYear;
  newProjectionItem.amount = parseFloat(amount);
  newProjectionItem.description = description || "";

  listOfProjectionItems.push(newProjectionItem);
  setProjections(listOfProjectionItems);
  return SUCCESS_MESSAGE_PROJECTION_ITEM_CREATED;
}

/** =========================================================
 * This function updates a Projection Item in LocalStorage and  
 * returns a message to indicate if the action was successful
 * @param {number} index - Index of the projection to update
 * @param {string} monthYear - Format: YYYY-MM
 * @param {number} amount - Expected income amount
 * @param {string} description - Optional description
 * @returns {string}
 ========================================================= */
export const updateProjectionItem = (index, monthYear, amount, description) => {
  // ===== 1. Ensure that monthYear is provided and in valid format =====
  if (isStringEmpty(monthYear) === true) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  const monthYearRegex = /^\d{4}-\d{2}$/;
  if (!monthYearRegex.test(monthYear)) {
    return ERROR_MESSAGE_INVALID_MONTH_YEAR_FORMAT;
  }

  // ===== 2. Ensure that amount is a valid numeric value =====
  if (isNaN(parseFloat(amount)) === true || isStringEmpty(amount) === true) {
    return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
  }

  let listOfProjectionItems = readProjectionItems();

  // ===== 3. Ensure index is valid =====
  if (index < 0 || index >= listOfProjectionItems.length) {
    return "Invalid projection index";
  }

  // ===== 4. Check for duplicate monthYear (excluding current item) =====
  for (let i = 0; i < listOfProjectionItems.length; i++) {
    if (i !== index && listOfProjectionItems[i].monthYear === monthYear) {
      return ERROR_MESSAGE_DUPLICATE_PROJECTION_MONTH_YEAR;
    }
  }

  // ===== 5. Update the Projection Item =====
  listOfProjectionItems[index].monthYear = monthYear;
  listOfProjectionItems[index].amount = parseFloat(amount);
  listOfProjectionItems[index].description = description || "";

  setProjections(listOfProjectionItems);
  return SUCCESS_MESSAGE_PROJECTION_ITEM_UPDATED;
}

/** ===========================================
 * This function deletes a specified Projection Item
 * @param {number} index - Index of the projection to delete
 =========================================== */
export const deleteProjectionItem = (index) => {
  let listOfProjectionItems = readProjectionItems();

  if (index >= 0 && index < listOfProjectionItems.length) {
    listOfProjectionItems.splice(index, 1);
    setProjections(listOfProjectionItems);
  }
}



// ================= HELPER FUNCTIONS ================= */
const isStringEmpty = (val) => {
  if (val === null) {
    return true;
  }

  let tempVal = String(val).replaceAll(" ", "");
  if (tempVal === "") {
    return true;
  }

  return false;
}
 
const isStringContainingAlphabetCharacters = (val) => {
  const hasAlphabetCharacters = /[a-zA-Z]/.test(val);
  return !hasAlphabetCharacters;
}

const isStringNumeric = (val) => {
  return /^\d+(\.\d+)?$/.test(val);
}