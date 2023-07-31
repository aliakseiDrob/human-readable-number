module.exports = function toReadable (number) {
  if(number < 10) {
    return defineNumberBelowTwenty(number, digits);
  }
  if(number > 9 && number < 20) {
    return defineNumberBelowTwenty(number, teens);
  }
  if(number > 19 && number < 100) {
    return defineDozens(number, dozens);
  }
  if(number > 99 && number < 1000) {
    return defineHundreds(number, hundred);
  }
}

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
}

const teens = {
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
}

const dozens = {
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety'
}

const hundred = 'hundred';

function defineNumberBelowTwenty(num, arr) {
  for(let i in arr) {
    if(num === Number(i)) {
      return arr[i];
    }
  }
}

function defineDozens(num, arr) {
  for(let i in arr) {
    if(num === Number(i)) {
      return arr[i];
    }
    else if(Math.floor(num / 10) * 10 === Number(i)) {
      return `${arr[i]} ${defineNumberBelowTwenty(Number(String(num).slice(1)), digits)}`;
    }
  }
}

function defineHundreds(num, arr) {
  for(let i in arr) {
    if(num % 100 === 0) {
      return `${defineNumberBelowTwenty(num / 100, digits)} ${hundred}`;
    }
    else if(num % 100 < 10) {
      return `${defineNumberBelowTwenty(Math.floor(num / 100), digits)} ${hundred}` + ' ' + `${defineNumberBelowTwenty(num % 100, digits)}`;
    }
    else if(num % 100 > 9 && num % 100 < 20) {
      return `${defineNumberBelowTwenty(Math.floor(num / 100), digits)} ${hundred}` + ' ' + `${defineNumberBelowTwenty(num % 100, teens)}`;
    }
    else if(num % 100 > 19 && num % 100 < 100) {
      return `${defineNumberBelowTwenty(Math.floor(num / 100), digits)} ${hundred}` + ' ' + `${defineDozens(num % 100, dozens)}`;
    }
  }
}
