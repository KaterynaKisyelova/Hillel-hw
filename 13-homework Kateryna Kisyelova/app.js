"use strict";

function Hamburger({ price, calories }) {
  (this.price = price), (this.calories = calories);
}

Hamburger.prototype.addTopping = function ({ price, calories }) {
  (this.price += price), (this.calories += calories);
};

Hamburger.prototype.getPrice = function () {
  return this.price;
};

Hamburger.prototype.getCalories = function () {
  return this.calories;
};

Hamburger.SIZE_SMALL = {
  price: 50,
  calories: 20,
};

Hamburger.SIZE_MEDIUM = {
  price: 75,
  calories: 30,
};

Hamburger.SIZE_LARGE = {
  price: 100,
  calories: 40,
};

Hamburger.TOPPING_CHEESE = {
  price: 10,
  calories: 20,
};

Hamburger.TOPPING_SALAD = {
  price: 20,
  calories: 5,
};

Hamburger.TOPPING_POTATO = {
  price: 15,
  calories: 10,
};

Hamburger.TOPPING_SEASONING = {
  price: 15,
  calories: 0,
};

Hamburger.TOPPING_MAYO = {
  price: 20,
  calories: 5,
};

const hamburger = new Hamburger(Hamburger.SIZE_SMALL);

hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);

console.log("Price with sauce: " + hamburger.getPrice());
console.log("Calories with sauce: " + hamburger.getCalories());
