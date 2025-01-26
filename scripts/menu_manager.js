

// 시작
updateContextMenu();


function updateContextMenu() {
    toSendMessage({
        type: "UPDATE_CONTEXT_MENU",
    });
}


// backscript.js 에서 이벤트 받기
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
        case "OPEN_URL":
            const url = base64ToString(message.base64);
            if (url === null) {
                alert(`"${message.base64}" 은/는 주소로 변환이 안됩니다.`);
                return;
            }
            window.open(url, "_blank");
            break;
        case "DECODING_BASE64":
            const str = base64ToString(message.base64);
            alert(str ?? `"${message.base64}" 은/는 해석이 안됩니다.`);
            break;
    
        default:
            throw new Error("뭐임???");
            break;
    }
});






function toSendMessage(dict) {
    chrome.runtime.sendMessage(dict);
}
