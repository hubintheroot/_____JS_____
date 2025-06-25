const defaultFontSizeInput = document.querySelector(
  '.container :nth-of-type(1) input'
);
const currFontSizeInput = document.querySelector(
  '.container :nth-of-type(2) input'
);
const resultBox = document.querySelector('.box-result');
const pxToEm = () => {
  if (
    defaultFontSizeInput &&
    defaultFontSizeInput.value &&
    currFontSizeInput &&
    currFontSizeInput.value
  ) {
    resultBox.textContent =
      Number(currFontSizeInput.value) / Number(defaultFontSizeInput.value);
    console.log(
      Number(currFontSizeInput.value) / Number(defaultFontSizeInput.value)
    );

    console.log(defaultFontSizeInput.value);
  } else {
    console.error('입력 필요');
  }
};
