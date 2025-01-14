// alert(window.location.host);
// "arca.live"


// 시작
updateContextMenu();


function updateContextMenu() {
    // - 아카면 메뉴 만들기
    // - 그외 사이트면 안만들기
    if (window.location.host === "arca.live") {
        sendMessage({
            type: "CREATE_CONTEXT_MENU",
            base64s: extractBase64()
        });
    }
    else {
        sendMessage({
            type: "NO_CONTEXT_MENU",
        });
    }
}


// backscript.js 에서 이벤트 받기
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "OPEN_URL") {
        const base64 = matchBase64(message.base64); // base64 가 맞는지 확인
        if (base64) {
            const url = atob(message.base64);
            window.open(url, "_blank");
            return;
        }
        alert(`"${message.base64}" 은/는 주소로 변환이 안됩니다.`);
    }
    else if (message.type === "UPDATE_CONTEXT_MENU") {
        updateContextMenu();
    }
});






function sendMessage(dict) {
    chrome.runtime.sendMessage(dict);
}

// DOM에서 특정 쿼리를 통해 URL을 추출하는 함수
function extractBase64() {
    const base64s = [];
    const pElements = document.querySelectorAll(".article-content>p");
    const tableElements = document.querySelectorAll(".article-content>table");
    const allElements = [...pElements, ...tableElements];
    allElements.forEach((element) => {
        const matches = matchBase64(element.textContent); // URL 패턴 추출
        if (matches) {
            base64s.push(...matches);
        }
    });
    return base64s;
}

function matchBase64(str) { // ["결과"] or null
    return str.match(/aHR0[0-9a-zA-Z_]+={0,2}/g);
}