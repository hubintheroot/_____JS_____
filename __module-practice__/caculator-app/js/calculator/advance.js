// TODO4: 제곱, n제곱근 함수를 구현하세요

// 제곱 함수
export function power(a, b) {
  // TODO4-1: a의 b제곱을 계산하는 로직을 작성하세요
  return Math.pow(a, b);
}

// n제곱근 함수
export function squareRoot(a, b) {
  // TODO4-2: a의 b제곱근을 계산하는 로직을 작성하세요
  return Math.pow(a, 1 / b);
}
