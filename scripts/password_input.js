


chrome.storage.local.get(["use_input_passward", "passward"], (result) => {
  if (!(result.use_input_passward ?? true)) {
    return;
  }

  const PASSWORD = result.passward ?? "smpeople";
  inputPassword(PASSWORD);
});

function inputPassword(passward) {
  // 한번 찾기 시도 후 없다면
  // 5초간 매 초 찾기 시도
  let inputElement = getInputElement();
  if (inputElement) {
    inputElement.value = passward;
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'a' }));
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'a' }));
  }
  else {
    // 1초 마다 실행, 찾으면 입력 후 종료
    let intervalId = setInterval(() => {

      inputElement = getInputElement();
      if (inputElement) {
        inputElement.value = passward;
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        inputElement.dispatchEvent(new Event('change', { bubbles: true }));
        inputElement.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'a' }));
        inputElement.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'a' }));
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
    case "kio.ac":
      findElement = document.querySelector("input.border-input");
      const disabledButtons = document.querySelectorAll('button[disabled]');
      const target = Array.from(disabledButtons).find(btn => btn.innerText.trim() === '확인');
      if (target) {
        target.disabled = false;
      }
      break;
    case "mega.nz":
      findElement = document.querySelector("input#password-decrypt-input");
      break;
    default:
      throw new Error("뭐임???");
  }
  return findElement;
}
