const REST_API_KEY = 'db62959ae64b80a7a0e5e762caf7c728';
const BOOK_URL = 'https://dapi.kakao.com/v3/search/book';

// TODO 1: 페이지네이션 상태 관리 변수 선언
// - currentPage: 현재 페이지 번호
// - totalPages: 전체 페이지 수
// - currentQuery: 현재 검색어

let currentPage = null; //현재 페이지 번호
let totalPages = null; //전체 페이지 수
let currentQuery = null; //현재 검색어

// DOM 요소 선택
const $bookList = document.getElementById('book-list');
const $pagination = document.getElementById('pagination');
const $searchForm = document.getElementById('search-form');
const $searchInput = document.getElementById('search-input');

function clearPagination() {
  $pagination.innerHTML = '';
}

// TODO 2: 책 검색 함수 수정 (페이지네이션 기능 추가)
async function searchBooks(page = 1) {
  // 2-1. 검색어 가져오기
  const query = $searchInput.value.trim();

  // 2-2. 빈 검색어 체크
  if (query === '') {
    alert('검색어를 입력해주세요!');
    $searchInput.focus();
    return;
  }

  // 2-3. 첫 번째 페이지일 때만 currentQuery 업데이트
  if (page === 1) {
    currentQuery = encodeURIComponent(query);
  }

  try {
    // 2-4. fetch 요청 URL에 page 파라미터 추가
    const response = await fetch(
      `${BOOK_URL}?query=${currentQuery}&size=10&page=${page}`,
      {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    // 2-5. 검색 결과 없을 때 처리
    if (data.documents.length === 0) {
      $bookList.innerHTML = '<li>검색 결과가 없습니다.</li>';
      // 페이지네이션 숨기기
      clearPagination();
      return;
    }

    // 책 검사 결과
    renderBooks(data.documents);

    // 2-7. 페이지 이동 시 맨 위로 스크롤
    window.scrollTo(0, 0);

    // 2-8. 페이지네이션 정보 업데이트
    const info = data.meta;
    // totalPages(data.meta.pageable_count 활용)
    totalPages = Math.ceil(info.pageable_count / 10);
    // currentPage 업데이트
    currentPage = page;
    // 페이지네이션 렌더링 함수 호출
    renderPagination();
  } catch (error) {
    console.error('검색 실패:', error);
    $bookList.innerHTML = '<li>검색 중 오류가 발생했습니다.</li>';
    // 에러 시 페이지네이션 숨기기
    clearPagination();
  }
}

// 폼 제출 이벤트
$searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchBooks(1);
});

// 책 목록 렌더링 함수
function renderBooks(books) {
  $bookList.innerHTML = '';

  books.forEach((book) => {
    const bookItem = document.createElement('li');
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <img src="${book.thumbnail}" alt=""/>
      <p>저자: ${book.authors.join(', ')}</p>
    `;
    $bookList.appendChild(bookItem);
  });
}

// TODO 3: 페이지네이션 렌더링 함수 구현
function renderPagination() {
  const frag = document.createDocumentFragment();
  // 3-1. 기존 페이지네이션 초기화
  clearPagination();
  // 3-2. 페이지가 1개 이하면 페이지네이션 숨기기
  if (!totalPages || totalPages <= 1) return;
  // 3-3. 이전 버튼 생성 (현재 페이지가 1보다 클 때만)
  if (totalPages > 1) {
    const firstPageBtn = document.createElement('button');
    firstPageBtn.textContent = '첫 페이지';
    firstPageBtn.addEventListener('click', () => searchBooks(1));
    if (currentPage === 1) {
      firstPageBtn.disabled = true;
    }
    frag.appendChild(firstPageBtn);

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '이전 페이지';
    prevBtn.addEventListener('click', () => {
      searchBooks(currentPage - 1);
    });
    frag.appendChild(prevBtn);
  }
  // 3-4. 페이지 번호 버튼 생성 (최대 5개)
  const maxBtns = 5;
  // startPage와 endPage 계산 (일정 페이지를 넘기면 중앙에 currPage가 고정되기)
  let startPage = Math.max(1, currentPage - Math.floor(maxBtns / 2));
  let endPage = startPage + maxBtns - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxBtns + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    if (i === currentPage) {
      // 현재 페이지면 active 클래스 추가
      pageBtn.classList.add('active');
      pageBtn.disabled = true;
      pageBtn.style.cursor = 'unset';
    }
    pageBtn.addEventListener('click', () => searchBooks(i));
    frag.appendChild(pageBtn);
  }

  // 3-5. 다음 버튼 생성 (현재 페이지가 마지막 페이지가 아닐 때만)

  if (currentPage < totalPages) {
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '다음 페이지';
    nextBtn.addEventListener('click', () => searchBooks(currentPage + 1));
    frag.appendChild(nextBtn);

    const lastPageBtn = document.createElement('button');
    lastPageBtn.textContent = '마지막 페이지';
    lastPageBtn.addEventListener('click', () => searchBooks(totalPages));
    frag.appendChild(lastPageBtn);
  }

  $pagination.appendChild(frag);
}
