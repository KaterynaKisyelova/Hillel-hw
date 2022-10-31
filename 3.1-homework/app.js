const FIRST_ORDINAL = "first";
const SECOND_ORDINAL = "second";

const operators = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

const operator = chooseOperation(operators);
const num1 = chooseNumber(FIRST_ORDINAL);
const num2 = chooseNumber(SECOND_ORDINAL);

const result = calculateResult(operators, operator, num1, num2);
const solution = createEquation(num1, num2, operator, result);
showEquation(solution);

function chooseOperation(operators) {
  const operator = prompt("Choose a mathematical operation (-, +, *, /)");
  if (!operators[operator]) {
    throw new Error("Invalid operator is entered.");
  }
  return operator;
}

function chooseNumber(ordinal) {
  const num = Number(prompt(`Enter the ${ordinal} number`));
  if (isNaN(num)) {
    throw new Error("Invalid data is entered.");
  } else if (ordinal === "second" && num === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return num;
}

function calculateResult(operators, operator, a, b) {
  return operators[operator](a, b);
}

function createEquation(a, b, operator, res) {
  return `${a} ${operator} ${b} = ${res}`;
}

function showEquation(equation) {
  alert(equation);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
