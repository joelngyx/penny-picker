/**
 * Computes a mathematical problem involving addition, subtraction, multiplication and division presented in a provided String
 * @param {String} toEvalString 
 * @returns {Float} Result of mathematical problem
 */
export const ComputeArithmetic = (toEvalString) => {
  /**
   * Assumptions:
   * 1. toEvalString can contain "+-", "-+", "--", all other substrings with 2 operators e.g., "**" are not present
   * 2. After replacing the substrings "+-" etc accordingly, 
   *    toEvalString will have the following sequence: =_Float_Operator_Float_..._Operator_Float
   * 3. Any substrings (during recursion) should have the following sequence: Float_Operator_..._Float_Operator_Float
   */

  /* Remove Equal Sign */
  let toProcess = toEvalString.replaceAll("=", "");

  /* Handle addition of negative values or subtraction of positive values */
  toProcess = toProcess.replaceAll("+-", "-");
  toProcess = toProcess.replaceAll("-+", "-");
  toProcess = toProcess.replaceAll("--", "+");

  let isWithinParentheses = false;
  let toProcessSubStringIndexStart = 0;
  let innerParentheses = 0;
  let processedString = "";

  /* Recursively handle contents of parentheses */
  for (let i = 0; i < toProcess.length; i++) {
    if (toProcess.charAt(i) === "(" && isWithinParentheses === false) {
      isWithinParentheses = true;
      toProcessSubStringIndexStart = i + 1;
    } else if (toProcess.charAt(i) === "(" && isWithinParentheses === true) {
      innerParentheses = innerParentheses + 1;
    } else if (toProcess.charAt(i) === ")" && innerParentheses > 0) {
      innerParentheses = innerParentheses - 1;
    } else if (toProcess.charAt(i) === ")" && innerParentheses === 0) {
      let result = ComputeArithmetic(toProcess.substring(toProcessSubStringIndexStart, i));
      processedString = processedString + result.toString();
      isWithinParentheses = false;
    } else if (isWithinParentheses === false) {
      processedString = processedString + toProcess.charAt(i).toString();
    }
  }  

  console.log(`[COMPUTE ARITHMETIC][INFO] Computing ${processedString}`);
  // eslint-disable-next-line 
  let operatorRegex = /([+\-*\/])/;
  let processedStringList;

  /* Handle multiplications */
  while (processedString.includes("*") === true || processedString.includes("/") === true) {
    processedStringList = processedString.split(operatorRegex);
    
    for (let j = 0; j < processedStringList.length; j ++) {
      let temp;
      let tempString = "";

      if (processedStringList[j] === "*") {
        temp = parseFloat(processedStringList[j - 1]) * parseFloat(processedStringList[j + 1]);
      } else if (processedStringList[j] === "/") {
        temp = parseFloat(processedStringList[j - 1]) / parseFloat(processedStringList[j + 1]); 
      } else {
        continue;
      }
      
      for (let k = 0; k < processedStringList.length; k ++) {
        if (k === j - 1) {
          tempString = tempString + temp;
        } else if (k === j || k === j + 1) {
          continue;
        } else {
          tempString = tempString + processedStringList[k];
        }
      }

      processedString = tempString;
      break;
    }
  }

  /* Handle additions and subtractions */
  let tokensList = processedString.split(operatorRegex);
  let result = tokensList[0];

  for (let l = 1; l < tokensList.length; l ++) {
    if (tokensList[l - 1] === "+") {
      result = parseFloat(result) + parseFloat(tokensList[l]);
    } else if (tokensList[l - 1] === "-") {
      result = parseFloat(result) - parseFloat(tokensList[l]);
    }
  }

  return result;
}