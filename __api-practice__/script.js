const REST_API_KEY = 'db62959ae64b80a7a0e5e762caf7c728';
const BOOK_URL = 'https://dapi.kakao.com/v3/search/book';

// DOM 요소 선택
const $bookList = document.getElementById('book-list');
const $searchForm = document.getElementById('search-form');
const $searchInput = document.getElementById('search-input');

function errorRender(msg) {
  $bookList.innerHTML = `<li>${msg}</li>`;
}

// TODO 1: 책 검색 함수 구현
async function searchBooks() {
  // 검색어 가져오기
  const searchKeyword = $searchInput.value.trim();
  // 빈 검색어 확인
  const validKeyword = /^[\w가-힣]{1,30}$/;
  if (!searchKeyword.length) {
    errorRender('검색어 입력이 필요합니다');
    return;
  } else if (!validKeyword.test(searchKeyword)) {
    errorRender('검색어는 한글, 영문, 숫자만 1~30자 입력 가능합니다.');
    return;
  }

  // API 호출
  try {
    // fetch를 사용해서 API 호출하기
    const res = await fetch(
      `${BOOK_URL}?query=${encodeURIComponent(searchKeyword)}&size=10`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      }
    );
    // 응답 상태 확인하기
    console.log(res.ok);
    if (!res.ok) throw new Error(res.status);

    // JSON 데이터로 변환하기
    const data = await res.json();
    // 결과가 없다면 '검색 결과가 없습니다.' 메시지 표시
    if (!data.documents.length) errorRender('검색 결과가 없습니다.');
    // 검색 결과를 화면에 표시하기
    renderBooks(data.documents);
  } catch (error) {
    // 에러 메시지 콘솔 및 화면에 표시하기
    errorRender(error);
    console.error(error);
  }
}

// TODO 2: 폼 제출 이벤트 처리
$searchForm.addEventListener('submit', (e) => {
  // 기본 동작 방지하기
  e.preventDefault();
  // 검색 함수 호출하기
  searchBooks();
});

// TODO 3: 책 목록 렌더링 함수
function renderBooks(books) {
  // 기존 내용 삭제
  $bookList.innerHTML = '';
  // 책 정보를 화면에 표시

  // 가상돔 사용
  const listsFrag = document.createDocumentFragment();
  books.forEach((book) => {
    const li = document.createElement('li');
    const title = document.createElement('h3');
    title.textContent = book.title;

    const img = document.createElement('img');
    img.setAttribute('src', book.thumbnail);
    img.setAttribute('alt', `도서 '${book.title}'의 표지`);
    img.style.width = '128px';

    const authors = document.createElement('p');
    authors.textContent = book.authors.join(', ');

    li.appendChild(title);
    li.appendChild(img);
    li.appendChild(authors);

    listsFrag.appendChild(li);
  });
  $bookList.appendChild(listsFrag);
}

// 🔍 구현 힌트
/*
📚 API 요청 URL 만들기:
`${BOOK_URL}?query=${encodeURIComponent(query)}&size=10`

🔑 Authorization 헤더 설정:
{
  headers: {
    'Authorization': `KakaoAK ${REST_API_KEY}`
  }
}

📊 API 응답 데이터 구조:
{
  "documents": [
    {
      "title": "책 제목",
      "authors": ["저자1", "저자2"],
      "thumbnail": "이미지 URL",
      "publisher": "출판사",
      "price": 15000
    }
  ]
}
*/
