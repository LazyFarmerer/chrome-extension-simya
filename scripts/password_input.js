


chrome.storage.local.get("use_input_passward", (result) => {
  if (!(result.use_input_passward ?? true)) {
    return;
  }

  inputPassword();
});


function inputPassword() {
  const PASSWORD = "smpeople";

  // 한번 찾기 시도 후 없다면
  // 5초간 매 초 찾기 시도
  let inputElement = getInputElement();
  if (inputElement) {
    inputElement.value = PASSWORD;
  }
  else {
    // 1초 마다 실행, 찾으면 입력 후 종료
    let intervalId = setInterval(() => {

      inputElement = getInputElement();
      if (inputElement) {
        inputElement.value = PASSWORD;
        clearInterval(intervalId);
      }
    }, 1000);

    // 5초 뒤 종료
    setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);
  }
}


// 인풋 요소 찾기
function getInputElement() {
  let findElement;
  switch (window.location.host) {
    case "kiosk.ac":
      findElement = document.querySelector("input.input");
      break;
    case "mega.nz":
      findElement = document.querySelector("input#password-decrypt-input");
      break;
    default:
      throw new Error("뭐임???");
  }
  return findElement;
}
