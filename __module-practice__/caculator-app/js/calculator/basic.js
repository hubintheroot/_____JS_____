// TODO1: 더하기, 빼기, 곱하기, 나누기 함수를 구현하세요

// 더하기 함수
function add(a, b) {
  // TODO1-1: 두 수를 더하는 로직을 작성하세요
  return a + b;
}

// 빼기 함수
function subtract(a, b) {
  // TODO1-2: 두 수를 빼는 로직을 작성하세요
  return a - b;
}

// 곱하기 함수
function multiply(a, b) {
  // TODO1-3: 두 수를 곱하는 로직을 작성하세요
  return a * b;
}

// 나누기 함수
function divide(a, b) {
  // TODO1-4: 나누기 함수를 작성하세요
  if (b === 0) throw new Error('0으로 나눌 수 없습니다.');
  return a / b;
}

// TODO1-5: 함수 export
export { add, subtract, multiply, divide };
