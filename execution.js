/*
  Enable strict mode.
 */
"use strict";

/**
 * [calculate Receives data of which generates a result.]
 * @param  {string} string - A string calculations.
 * @return {number} result - Generated result.
 */
function calculate(string) {
  var multiply, divide, addSecond, odejmij, 
      add, substract, result1, result2, resultTemp,
      tableTemp = [],
      table = [],
      resultFirst = 0,
      resultSecond = 0,
      table = string.split("");

  function searchLower(a, b) {
    var resultSort;
    if (a == -1 && b != -1) resultSort = b;
    else if (a != -1 && b == -1) resultSort = a;
    else if (a > b) resultSort = b;
    else if (a < b) resultSort = a;
    else resultSort = 'error!';
    return resultSort;
  }

  /**
   * Generates the appropriate number of string.
   */
  for (var i = 0; i < table.length; i++) {
    if (!isNaN(table[i]) && !isNaN(table[i+1])) {
      table[i] = table[i] + table[i+1];
      table.splice(i+1, 1);
    }
    if (!isNaN(table[i])) table[i] = Number(table[i]);
    if (table[i+1] == '.') {
      table[i] = table[i] + table[i+1] + table[i+2];
      table[i] = Number(table[i]);
      table.splice(i+1,2);
    }
  }

  while (table.length != 0) {
    /**
     * Gets same signs of addition and subtraction calculations.
     */
    if (table[1] == '+' || table[1] == '-' || table[2] == '+' || table[2] == '-' || table.length == 1) {
      if (table[3] == '*' || table[3] == '/') {
        resultTemp = table[0];
        table.splice(0,1);
      }
      else {
        add = table.indexOf('+');
        substract = table.indexOf('-');
        result1 = searchLower(add, substract);
        multiply = table.indexOf('*',result1);
        divide = table.indexOf('/',result1);
        result2 = searchLower(multiply, divide);
        result1--;
        result2 -= 2;

        if (multiply == -1) result2 = table.length;

        tableTemp = table.slice(result1,result2);
        table.splice(0, result2 - 1);
        if (table[0] = "+") table.splice(0, 1);

        resultTemp = tableTemp[0];

        for (var l = 0; l < tableTemp.length; l++) {
          if (tableTemp[l+1] == '+') resultTemp += tableTemp[l+2];
          else if (tableTemp[l+1] == '-') resultTemp -= tableTemp[l+2];
        }
      }
      resultFirst += resultTemp;
    }
    /**
     * Gets same signs of multiplication and division to calculate because of the priority of calculations.
     */
    else if (table[1] == '*' || table[1] == '/' || table[2] == '*' || table[2] == '/') {
      multiply = table.indexOf('*');
      divide = table.indexOf('/');
      result1 = searchLower(multiply, divide);
      add = table.indexOf('+', result1);
      substract = table.indexOf('-', result1);

      if (addSecond == -1) addSecond = table.length-1;

      if (add == substract) result2 = table.length;
      else result2 = searchLower(add, substract);
      result1--;

      var l = 0;
      if (table[result1-1] == '-') {
        result1 -= 1;
        l++;
      }
      if (table.length == 0) break;

      tableTemp = table.slice(result1,result2);
      table.splice(0, result2 - 1);
      if (table[0] = "+") table.splice(0, 1);
      if (l == 1) resultTemp = -tableTemp[l];
      else resultTemp = tableTemp[l];

      for (l; l < tableTemp.length; l++) {
        if (tableTemp[l+1] == '*') resultTemp *= tableTemp[l+2];
        else if (tableTemp[l+1] == '/') resultTemp /= tableTemp[l+2];
      }
      resultSecond += resultTemp;
    }  
  }

  var result = resultFirst + resultSecond;

  return result;
}