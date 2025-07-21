const digits = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
};

const tens = {
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
};

const dozens = {
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};

function convertNumberBelowTwenty(number, rulesObject) {
  let result = 0;
  Object.keys(rulesObject).forEach((key) => {
    if (number === Number(key)) {
      result = rulesObject[key];
    }
  });
  return result;
}

function convertDozens(num, rulesObject) {
  let result = 0;
  Object.keys(rulesObject).forEach((key) => {
    if (num === Number(key)) {
      result = rulesObject[key];
    } else if (Math.floor(num / 10) * 10 === Number(key)) {
      result = `${rulesObject[key]} ${convertNumberBelowTwenty(Number(String(num).slice(1)), digits)}`;
    }
  });
  return result;
}

function convertHundreds(num) {
  const hundred = 'hundred';
  let result = 0;
  if (num % 100 === 0) {
    result = `${convertNumberBelowTwenty(num / 100, digits)} ${hundred}`;
  } else if (num % 100 < 10) {
    result =
      `${convertNumberBelowTwenty(Math.floor(num / 100), digits)} ${hundred}` +
      ' ' +
      `${convertNumberBelowTwenty(num % 100, digits)}`;
  } else if (num % 100 > 9 && num % 100 < 20) {
    result =
      `${convertNumberBelowTwenty(Math.floor(num / 100), digits)} ${hundred}` +
      ' ' +
      `${convertNumberBelowTwenty(num % 100, tens)}`;
  } else if (num % 100 > 19 && num % 100 < 100) {
    result =
      `${convertNumberBelowTwenty(Math.floor(num / 100), digits)} ${hundred}` +
      ' ' +
      `${convertDozens(num % 100, dozens)}`;
  }

  return result;
}

module.exports = function toReadable(number) {
  let result = 0;
  if (number < 10) {
    result = convertNumberBelowTwenty(number, digits);
  } else if (number > 9 && number < 20) {
    result = convertNumberBelowTwenty(number, tens);
  } else if (number > 19 && number < 100) {
    result = convertDozens(number, dozens);
  } else if (number > 99 && number < 1000) {
    result = convertHundreds(number);
  }
  return result;
};
