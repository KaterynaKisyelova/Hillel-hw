const operator = prompt("Choose a mathematical operation (-, +, *, /)");
const num1 = Number(prompt("Enter the first number"));
const num2 = Number(prompt("Enter the second number"));
const solution = createEquation();

function createEquation() {
  if (isNaN(num1) || isNaN(num2)) {
    return "Invalid data is entered.";
  }
  const result = calculateResult();
  if (result === null) {
    return "Invalid operator is entered.";
  }
  return `${num1} ${operator} ${num2} = ${result}`;
}

function calculateResult() {
  let res;
  switch (operator) {
    case "+":
      res = num1 + num2;
      break;
    case "-":
      res = num1 - num2;
      break;
    case "*":
      res = num1 * num2;
      break;
    case "/":
      res = num1 / num2;
      break;
    default:
      return null;
  }
  return res;
}

alert(solution);
