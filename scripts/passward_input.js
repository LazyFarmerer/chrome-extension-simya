

const passward = "smpeople";


// 1초 마다 실행, 찾으면 입력 후 종료
let intervalId = setInterval(() => {

    let inputElement = getInputElement();
    if (inputElement) {
        inputElement.value = passward;
        clearInterval(intervalId);
    }
}, 1000);

// 5초 뒤 종료
setTimeout(() => {
    clearInterval(intervalId);
}, 5000);


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
            throw new Error("뭐임???")
    }
    return findElement;
}
