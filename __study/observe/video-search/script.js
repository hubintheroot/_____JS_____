const $form = document.querySelector('#search-form');
const $input = $form.querySelector('#search-input');
const $list = document.querySelector('#vclip-list');
const $observerTarget = document.querySelector('#observer-target');
const $loading = document.querySelector('#loading');

const KAKAO_API_KEY = '';

let [currPage, currQuery] = [null, null];
let [hasMore, isLoading, isFirst] = [false, false, true];
let observer = null;

// --- 유틸리티 함수 ---
function formatDate(isoString, maxLength = 2, fillString = '0') {
  const formatString = (str) => str.padStart(maxLength, fillString);
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = formatString(String(date.getMonth() + 1));
  const day = formatString(String(date.getDate()));
  const hours = formatString(String(date.getHours()));
  const minutes = formatString(String(date.getMinutes()));

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}

function alertMsg(msg) {
  if (isFirst) $list.innerHTML = `<li>${msg}</li>`;
  hasMore = false;
}

function clearList() {
  $list.innerHTML = '';
}

// --- 렌더링 함수 ---
function renderList(nextData) {
  if (isFirst) clearList();
  const frag = document.createDocumentFragment();
  nextData.forEach((video) => {
    const videoItem = document.createElement('li');
    videoItem.classList.add('vclip-item');
    videoItem.innerHTML = `
      <a href="${video.url}" class="vclip-thumbnail-link">
          <img src="${
            video.thumbnail
          }" alt="Video thumbnail" class="vclip-thumbnail">
          <span class="vclip-playtime">${video.play_time}</span>
      </a>
      <div class="vclip-info">
          <h3 class="vclip-title">
              <a href="#">${video.title}</a>
          </h3>
          <div class="vclip-author">${video.author}</div>
          <div class="vclip-datetime">${formatDate(video.datetime)}</div>
      </div>
    `;
    frag.appendChild(videoItem);
  });
  $list.appendChild(frag);
}

// --- API 통신 함수 ---
async function fetchVideo() {
  const baseURL = 'https://dapi.kakao.com/v2/search/vclip';
  const headers = {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  };

  isLoading = true;
  $loading.classList.add('active');

  try {
    const res = await fetch(
      `${baseURL}?query=${currQuery}&page=${currPage}&size=16`,
      {
        method: 'GET',
        headers: headers,
      }
    );
    if (!res.ok) throw new Error(res.status);

    const data = await res.json();

    if (!data.documents.length) {
      if (isFirst) alertMsg('검색 결과가 없습니다.');
      return;
    }

    return [data.documents, data.meta.is_end];
  } catch (error) {
    if (isFirst) alertMsg(error);
    return;
  } finally {
    isLoading = false;
    $loading.classList.remove('active');
  }
}

// --- 비디오 검색 및 로딩 함수 ---
async function searchVideo() {
  const query = $input.value.trim();
  if (!query) {
    alertMsg('검색어를 입력해주세요!');
    $input.focus();
    return;
  }

  currPage = 1;
  currQuery = encodeURIComponent(query);
  hasMore = true;
  isFirst = true;
  clearList();

  const [data, isEnd] = await fetchVideo();
  hasMore = !isEnd;

  renderList(data);
}

async function loadMoreVideo() {
  if (isLoading || !hasMore) return;
  currPage++;
  isFirst = false;
  const [data, isEnd] = await fetchVideo();
  hasMore = !isEnd;

  renderList(data);
}

// --- Intersection Observer 설정 ---
function setupIntersectionObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !isLoading && currQuery) {
        loadMoreVideo();
      }
    },
    {
      root: null,
    }
  );
  observer.observe($observerTarget);
}

// --- 이벤트 바인딩 ---
(() => {
  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchVideo();
  });
})();

(() => {
  document.addEventListener('DOMContentLoaded', setupIntersectionObserver);
  document.addEventListener('beforeunload', () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });
})();
