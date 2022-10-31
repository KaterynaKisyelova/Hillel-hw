"use strict";

const calc = new Calculator(100);

calc.add(10);
calc.add(10);
calc.sub(20);
calc.set(20);
calc.add(10);
calc.add("qwe");
console.log(calc.get());

function Calculator(base) {
  this.base = base;

  this.add = function (num) {
    if (!isNaN(num)) {
      this.base += num;
    }
  };
  this.sub = function (num) {
    if (!isNaN(num)) {
      this.base -= num;
    }
  };
  this.set = function (num) {
    if (!isNaN(num)) {
      this.base = num;
    }
  };
  this.get = function () {
    return this.base;
  };
}
