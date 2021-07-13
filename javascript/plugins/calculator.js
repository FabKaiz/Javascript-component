let total = 0;

function addition(x) {
  total += x;
  return total;
}

function subtraction(x) {
  total -= x;
  return total;
}

function division(x) {
  if (total === 0) {
    return (total = x);
  } else {
    total /= x;
    return total;
  }
}

function multiplication(x) {
  if (total === 0) {
    return (total = x);
  } else {
    total *= x;
    return total;
  }
}

function reset() {
  total = 0;
}

console.log('hey');

export { addition, subtraction, division, multiplication, }