import { LOCAL_STORAGE_BUDGET_LIST } from "../shared/constants";



const ERROR_MESSAGE_EMPTY_STRING = "Please provide a non-empty input";
const ERROR_MESSAGE_DUPLICATE_BUDGET_NAME = "Duplicate budget names are not allowed";
const SUCCESS_MESSAGE_BUDGET_ITEM_CREATED = "Created a new budget!"
const ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT = "Please provide a numeric input";
const SUCCESS_MESSAGE_BUDGET_UPDATED = "Updated the budget!";
const SUCCESS_MESSAGE_EXPENSE_ITEM_CREATED = "Logged an Expense!";
const SUCCESS_MESSAGE_EXPENSE_ITEM_UPDATED = "Updated an Expense!";



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
  if (val === null) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  let tempVal = val.replaceAll(" ", "");
  if (tempVal === "") {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Ensure that Budget names are unique =====
  let listOfBudgetNames = readBudgetNames();
  for (let i = 0; i < listOfBudgetNames.length; i++) {
    let existingbudgetName = listOfBudgetNames[i].replaceAll(" ", "");
    if (existingbudgetName === tempVal) {
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

  if (updatedBudgetAmount === null || updatedBudgetAmount === "") {
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
  if (updatedBudgetName === null) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  let tempVal = updatedBudgetName.replaceAll(" ", "");
  if (tempVal === "" || tempVal === null) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Ensure that Budget names are unique =====
  let listOfBudgetNames = readBudgetNames();
  
  for (let i = 0; i < listOfBudgetNames.length; i++) {
    let existingbudgetName = listOfBudgetNames[i].replaceAll(" ", "");
    if (existingbudgetName === tempVal) {
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
  if (expenseDescription === null) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  let tempVal = expenseDescription.replaceAll(" ", "");
  if (tempVal === "" || tempVal === null) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Ensure that the Expense Amount is a numeric value =====
  if (isNaN(parseFloat(expenseAmount)) === true) {
    return ERROR_MESSAGE_INVALID_INPUT_NOT_FLOAT;
  }

  if (expenseAmount === null || expenseAmount === "") {
    return ERROR_MESSAGE_EMPTY_STRING;
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
      console.log(`${expenseItem.expenseDescription} ${expenseItem.expenseAmount} ${expenseItem.dateTime}`);
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
      for (let j = 0; j < budgetItem.expenseList.length; j++) {
        console.log(`${j}`)
        if (j === index) {
          console.log(`${j} ${index}`)
          budgetItem.expenseList.splice(j, 1);
          break;
        }
      }
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
  if (updatedExpenseDescription === null) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  let tempVal = updatedExpenseDescription.replaceAll(" ", "");
  if (tempVal === "" || tempVal === null) {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Update the specificed ExpenseItem =====
  let listOfBudgetItems = readBudgetItems();

  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];

    if (budgetItem.budgetName === budgetName) {
      for (let j = 0; j < budgetItem.expenseList.length; j++) {
        console.log(`${j}`)
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

  if (updatedExpenseAmount === null || updatedExpenseAmount === "") {
    return ERROR_MESSAGE_EMPTY_STRING;
  }

  // ===== 2. Update the specificed ExpenseItem =====
  let listOfBudgetItems = readBudgetItems();

  for (let i = 0; i < listOfBudgetItems.length; i++) {
    let budgetItem = listOfBudgetItems[i];

    if (budgetItem.budgetName === budgetName) {
      for (let j = 0; j < budgetItem.expenseList.length; j++) {
        console.log(`${j}`)
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




export const computeTotalExpenseForABudgetForAGivenMonth = (yearMonth, budgetName) => {
  let listOfBudgetItems = readBudgetItems();
}