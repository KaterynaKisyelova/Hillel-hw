Array.prototype.max = function () {
  return this.reduce((cur, next) => (cur - next <= 0 ? next : cur));
};

console.log([6, 5, 8, 7].max());
