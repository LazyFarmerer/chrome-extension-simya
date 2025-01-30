


// chrome.tabs.onUpdated.addListener <- 업로드 끝나면 실행, 묘하게 느린듯한 느낌 심함
// chrome.tabs.onActivated.addListener <- 텝 이동시에만 실행, 크롬 첫 시작시 작동 안함


// 텝이동 했을 때 실행
chrome.tabs.onActivated.addListener(() => {
  updateContextMenu();
});

// menu_manager.js 에서 이벤트 받기
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  switch (request.type) {
    case "UPDATE_CONTEXT_MENU":
      updateContextMenu();
      break;

    default:
      throw new Error("뭐임???");
      break;
  }
});

// 메뉴 클릭 시 실행
chrome.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case "SELECTION_BASE64":
      toSendMessage({
        type: "OPEN_URL",
        base64: info.selectionText
      });
      break;
    case "DECODING_BASE64":
      toSendMessage({
        type: "DECODING_BASE64",
        base64: info.selectionText
      });
      break;

    default:
      throw new Error("뭐임???");
      break;
  }
});

// 1. 메뉴를 지우고
// 2. 사이트에 따라 메뉴 만들지 안만들지 진행
async function updateContextMenu() {

  chrome.contextMenus.removeAll();

  // 사이트가 아카라이브가 아니라면 메뉴 안만들고 조기리턴
  const tab = await getTab();
  if (!tab.url.startsWith("https://arca.live")) {
    return;
  }

  chrome.contextMenus.create({
    title: "링크 바로가기", // 메뉴 타이틀
    id: "SELECTION_BASE64", // 식별자
    contexts: ["selection"], // 메뉴가 어떤 타입에 대해 활성화될지 결정
  });
  chrome.contextMenus.create({
    title: "암호 풀기",
    id: "DECODING_BASE64",
    contexts: ["selection"],
  });
}



// background에서 contentScript로 메시지를 보낼 때는
// contentScript에서 사용하는 tab 아이디를 알고 있어야 함
async function toSendMessage(dict) {
  const tab = await getTab();
  chrome.tabs.sendMessage(tab.id, dict);
}

async function getTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
