// TODO3: 사용자 상태를 관리하는 모듈을 작성하세요

// TODO3-1: 사용자 상태 변수를 export하세요 (false: 기본 계산기, true: 고급 계산기)
//export let userState = /* 초기값 설정 */;

let userState = true;

// TODO3-2: 사용자 상태 변경 함수를 작성하세요
function changeUserState(newState) {
  // 상태를 변경하고 반환하는 로직을 작성하세요
  userState = newState;
}

export { userState, changeUserState };
