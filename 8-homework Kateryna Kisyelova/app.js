"use strict";

const calculator = createCalculator(100);

calculator.add(10);
calculator.add(10);
calculator.sub(20);
calculator.set(20);
calculator.add(10);
calculator.add(10);
calculator.add("qwe");

console.log(calculator.get());

function createCalculator(base) {
  const initialValue = base;

  function add(num) {
    if (!isNaN(num)) {
      base += num;
    }
  }
  function sub(num) {
    if (!isNaN(num)) {
      base -= num;
    }
  }
  function set(num) {
    if (!isNaN(num)) {
      base = num;
    }
  }
  function reset() {
    base = initialValue;
  }

  return {
    add,
    sub,
    set,
    get: () => base,
    reset,
  };
}
