factorial(3);
factorial(5);

function factorial(n) {
  if (n <= 0) return "Invalid data";
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
