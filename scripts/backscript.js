
// 텝이동 했을 때 실행
chrome.tabs.onActivated.addListener( async () => {
    await toSendMessage({
        type: "UPDATE_CONTEXT_MENU"
    });
});

// menu_manager.js 에서 이벤트 받기
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    chrome.contextMenus.removeAll();

    switch (request.type) {
        case "CREATE_CONTEXT_MENU":
            create_context_munu(request);
            break;
        case "NO_CONTEXT_MENU":
            break;
    }
});

// 메뉴 클릭 시 실행
chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "SELECTION_BASE64") {
        await toSendMessage({
            type: "OPEN_URL",
            base64: info.selectionText
        });
    }
    else if (info.menuItemId.startsWith("aHR0")) {
        await toSendMessage({
            type: "OPEN_URL",
            base64: info.menuItemId
        });
    }
});


function create_context_munu(request) {
    let base64s = [...request.base64s];
    base64s = [...new Set(base64s)];

    chrome.contextMenus.create({
        title: "링크 바로가기", // 메뉴 타이틀
        id: "SELECTION_BASE64", // 식별자
        contexts: ["selection"], // 메뉴가 어떤 타입에 대해 활성화될지 결정
    });

    base64s.forEach((base64) => {
        chrome.contextMenus.create({
            title: `링크: ${atob(base64)}`,
            id: base64,
            contexts: ["all"],
        });
    });
}

// background에서 contentScript로 메시지를 보낼 때는
// contentScript에서 사용하는 tab 아이디를 알고 있어야 함
async function toSendMessage(dict) {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);

    chrome.tabs.sendMessage(tab.id, dict);
}
