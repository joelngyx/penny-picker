import {
  readBudgetItems,
  readBudgetNames,
  createNewBudgetItem,
  updateBudgetAmount,
  updateBudgetName,
  deleteBudgetItem,
  addBudgetItemExpenseItem,
  readBudgetItemExpenseList,
  deleteBudgetItemExpenseItem,
  updateBudgetItemExpenseItemDescription,
  updateBudgetItemExpenseItemAmount,
  computeTotalExpenseForABudgetForAGivenMonth,
  readTabItems,
  readTabNames,
  createNewTabItem,
  addPersonToTabItem,
  updateTabName,
  deleteTab,
  addTabRecord,
  deleteTabRecord,
  deleteNameFromTab,
  calculateTabBalanceForThisPerson
} from './LocalStorageManager';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Budget Functions', () => {
  test('readBudgetItems returns empty array when no data', () => {
    localStorage.getItem.mockReturnValue(null);
    expect(readBudgetItems()).toEqual([]);
  });

  test('readBudgetItems returns parsed data', () => {
    const mockData = [{ budgetName: 'Test', budgetAmount: 100 }];
    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));
    expect(readBudgetItems()).toEqual(mockData);
  });

  test('readBudgetNames returns budget names', () => {
    const mockData = [{ budgetName: 'Test1' }, { budgetName: 'Test2' }];
    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));
    expect(readBudgetNames()).toEqual(['Test1', 'Test2']);
  });

  test('createNewBudgetItem creates a new budget', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify([]));
    const result = createNewBudgetItem('New Budget');
    expect(result).toBe('Created a new Budget!');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('createNewBudgetItem rejects empty name', () => {
    expect(createNewBudgetItem('')).toBe('Please provide a non-empty input');
  });

  test('createNewBudgetItem rejects duplicate name', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify([{ budgetName: 'Existing' }]));
    expect(createNewBudgetItem('Existing')).toBe('Duplicate Budget names are not allowed');
  });

  test('updateBudgetAmount updates amount', () => {
    const mockData = [{ budgetName: 'Test', budgetAmount: 100 }];
    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));
    const result = updateBudgetAmount('Test', 200);
    expect(result).toBe('Updated the Budget!');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('updateBudgetAmount rejects invalid amount', () => {
    expect(updateBudgetAmount('Test', 'abc')).toBe('Please provide a numeric input');
  });

  test('addBudgetItemExpenseItem adds expense', () => {
    const mockData = [{ budgetName: 'Test', expenseList: [] }];
    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));
    const result = addBudgetItemExpenseItem('Test', 'Lunch', 10);
    expect(result).toBe('Logged an Expense!');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('addBudgetItemExpenseItem rejects empty description', () => {
    expect(addBudgetItemExpenseItem('Test', '', 10)).toBe('Please provide a non-empty input');
  });

  test('addBudgetItemExpenseItem rejects non-numeric amount', () => {
    expect(addBudgetItemExpenseItem('Test', 'Lunch', 'abc')).toBe('Please provide a numeric input');
  });
});

describe('Tab Functions', () => {
  test('readTabItems returns empty array when no data', () => {
    localStorage.getItem.mockReturnValue(null);
    expect(readTabItems()).toEqual([]);
  });

  test('createNewTabItem creates a new tab', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify([]));
    const result = createNewTabItem('New Tab');
    expect(result).toBe('Created a new Tab!');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('createNewTabItem rejects empty name', () => {
    expect(createNewTabItem('')).toBe('Please provide a non-empty input');
  });

  test('createNewTabItem rejects duplicate name', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify([{ tabName: 'Existing' }]));
    expect(createNewTabItem('Existing')).toBe('Duplicate Tab names are not allowed');
  });

  test('addPersonToTabItem adds person', () => {
    const mockData = [{ tabName: 'Test', personsList: ['You'] }];
    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));
    const result = addPersonToTabItem('Test', 'Alice');
    expect(result).toBe('Added a person to this Tab!');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('addPersonToTabItem rejects duplicate person', () => {
    const mockData = [{ tabName: 'Test', personsList: ['You', 'Alice'] }];
    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));
    expect(addPersonToTabItem('Test', 'Alice')).toBe('Duplicate names are not allowed');
  });

  test('addTabRecord adds record', () => {
    const mockData = [{ tabName: 'Test', tabRecordsList: [] }];
    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));
    const result = addTabRecord('Test', 'Alice', 'You', 'Dinner', 20);
    expect(result).toBe('Added a Record to this Tab!');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('calculateTabBalanceForThisPerson calculates balance', () => {
    const mockData = [{
      tabName: 'Test',
      tabRecordsList: [
        { personWhoOwes: 'Alice', personWhoIsOwed: 'You', amountOwed: 10 },
        { personWhoOwes: 'You', personWhoIsOwed: 'Alice', amountOwed: 5 }
      ]
    }];
    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));
    expect(calculateTabBalanceForThisPerson('Test', 'You')).toBe(5);
  });
});