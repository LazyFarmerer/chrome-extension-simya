

// 시작
updateContextMenu();


function updateContextMenu() {
    // - 아카면 메뉴 만들기
    // - 그외 사이트면 안만들기
    if (window.location.host === "arca.live") {
        toSendMessage({
            type: "CREATE_CONTEXT_MENU",
        });
        return;
    }

    toSendMessage({
        type: "NO_CONTEXT_MENU",
    });
}


// backscript.js 에서 이벤트 받기
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "OPEN_URL") {
        const url = base64ToString(message.base64);
        if (url === null) {
            alert(`"${message.base64}" 은/는 주소로 변환이 안됩니다.`);
            return;
        }
        window.open(url, "_blank");
    }
    else if (message.type === "DECODING_BASE64") {
        const str = base64ToString(message.base64);
        alert(str ?? `"${message.base64}" 은/는 해석이 안됩니다.`);
    }
    else if (message.type === "UPDATE_CONTEXT_MENU") {
        updateContextMenu();
    }
});






function toSendMessage(dict) {
    chrome.runtime.sendMessage(dict);
}
