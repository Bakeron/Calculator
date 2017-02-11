/*
  Enable strict mode.
 */
"use strict";

/**
 * Download tags home to the variables and download the list of keys to variable.
 */
var buttons = document.getElementById('buttons'),
    view = document.getElementById('view'),
    result = 0,
    final_result = 0,
    allowed_values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'],
    allowed_operations = ['+', '-', '*', '/', '.'];
/**
 * Ensuring button pressed and the print on the screen.
 * @param  {event} event - Receives pressed button.
 * @return {void}
 */
buttons.addEventListener('click', function (event) {
  var last_character = view.innerHTML.charAt(view.innerHTML.length - 1),
      value = event.target.value;

  if (value == 'result') {
    result = view.innerHTML;
    final_result = calculate(result);
    view.innerHTML += (' = ' + final_result);
  }
  else if (value == 'on') {
    view.innerHTML = 0;
    view.style.display = 'block';
  }
  else if (value == 'off') {
    view.style.display = 'none';
  }
  else if (allowed_values.indexOf(value) != -1) {
    if ((allowed_operations.indexOf(last_character) != -1 && allowed_operations.indexOf(value) != -1) || (view.innerHTML.indexOf('=') != -1 && allowed_operations.indexOf(value) != -1))
      view.innerHTML += '';      
    else if ((view.innerHTML == '0' && allowed_operations.indexOf(value) == -1) || view.innerHTML.indexOf('=') != -1)
      view.innerHTML = value;
    else view.innerHTML += value;
  }
});