# 과제

## 아래의 DOM 명령어 찾아보고, 정리

### 클래스 제어

| 메서드               | 설명                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| classList.add()      | 클래스 명 추가                                                          |
| classList.remove()   | 클래스 명 제거                                                          |
| classList.contains() | 클래스 명이 포함되어있는지 여부 확인                                    |
| classList.toggle()   | 클래스 명을 토글링 하는 메서드로 클래스가 있으면 제거, 없으면 추가한다. |

#### 사용 예시

```js
const el = document.getElementById('myDiv');

// 클래스 추가
el.classList.add('active');

// 클래스 제거
el.classList.remove('active');

// 클래스 포함 여부 확인
console.log(el.classList.contains('active')); // true 또는 false

// 클래스 토글
el.classList.toggle('active');
```

### 요소의 크기/위치

| 메서드                  | 설명                                                                |
| ----------------------- | ------------------------------------------------------------------- |
| getBoundingClientRect() | 요소의 크기와 뷰포트 기준 위치 정보를 담은 DOMRect 객체를 반환한다. |
| offsetLeft              | 부모 요소 기준 왼쪽에서의 거리(픽셀 단위)를 반환한다.               |
| offsetTop               | 부모 요소 기준 위쪽에서의 거리(픽셀 단위)를 반환한다.               |

#### 사용 예시

```js
const el = document.getElementById('myDiv');

// 요소의 크기와 위치 정보 얻기
const rect = el.getBoundingClientRect();
console.log(rect.width, rect.height, rect.top, rect.left);

// 부모 요소 기준 위치
console.log(el.offsetLeft); // 왼쪽 거리
console.log(el.offsetTop); // 위쪽 거리
```

### 속성 제어

| 메서드         | 설명                                                           |
| -------------- | -------------------------------------------------------------- |
| getAttribute() | 요소에서 지정한 속성의 값을 가져온다.                          |
| setAttribute() | 요소에 지정한 속성과 값을 설정하거나, 기존 속성 값을 변경한다. |

#### 사용 예시

```js
const el = document.getElementById('myDiv');

// 속성 값 가져오기
const value = el.getAttribute('data-key');
console.log(value);

// 속성 값 설정/변경
el.setAttribute('data-key', 'newValue');
```

### dataset 으로 접근하기

#### HTML

```html
<div id="myDiv" data-key="value"></div>
```

#### CSS

```css
/* data-key 속성 값이 'value'인 요소 선택 */
div[data-key='value'] {
  color: red;
}
```

#### JavaScript

```js
const el = document.getElementById('myDiv');

// dataset으로 접근
console.log(el.dataset.key); // "value"

// data-key 값 변경
el.dataset.key = 'newValue';
```
