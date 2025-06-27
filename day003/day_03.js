(() => {
  // 01. heights에서 ghost보다 큰 사람 몇명인지 출력
  const heights = [150, 169, 185, 170];
  const ghost = 167;
  console.log(heights.filter((t) => t > ghost).length);

  //   02. words 중 l이 들어간 단어만 배열로 저장
  const words = ['hello', 'ghost', 'apple', 'grape', 'lemon'];
  console.log(words.filter((w) => w.toLowerCase().includes('l')));
})();
