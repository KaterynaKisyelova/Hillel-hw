const ORDINALS = ["first", "second", "third", "fourth"];

const operators = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

const operator = chooseOperation(operators);
const operandsAmount = chooseOperandsAmount();
const operands = chooseNumber(ORDINALS, operandsAmount);

const result = calculateResult(operators, operator, operands);
const solution = createEquation(operands, operator, result);
showEquation(solution);

function chooseOperation(operators) {
  let operator;
  do {
    operator = prompt("Choose a mathematical operation (-, +, *, /)");
  } while (!operators[operator]);
  return operator;
}

function chooseOperandsAmount() {
  let amount;
  do {
    amount = Number(
      prompt("Choose the number of operands (more than 1 and less than 5")
    );
  } while (isNaN(amount) || amount === "" || amount < 2 || amount > 4);
  return amount;
}

function chooseNumber(ordinals, amount) {
  let arr = [];
  for (let i = 0; i < amount; i++) {
    let num;
    do {
      num = Number(prompt(`Enter the ${ordinals[i]} number`));
    } while (isNaN(num) || num === "");
    arr.push(num);
  }
  return arr;
}

function calculateResult(operators, operator, operands) {
  return operators[operator](operands);
}

function createEquation(operands, operator, res) {
  return `${operands.join(` ${operator} `)} = ${res}`;
}

function showEquation(equation) {
  alert(equation);
}

function add(operands) {
  let res = operands[0];
  for (let i = 1; i < operands.length; i++) {
    res += operands[i];
  }
  return res;
}

function subtract(operands) {
  let res = operands[0];
  for (let i = 1; i < operands.length; i++) {
    res -= operands[i];
  }
  return res;
}

function multiply(operands) {
  let res = operands[0];
  for (let i = 1; i < operands.length; i++) {
    res *= operands[i];
  }
  return res;
}

function divide(operands) {
  let res = operands[0];
  for (let i = 1; i < operands.length; i++) {
    res /= operands[i];
  }
  return res;
}
