

chrome.storage.local.get("use_article_expander", (result) => {
  if (result.use_article_expander ?? false) {
    initializeArticleExpander();
  }
});


function initializeArticleExpander() {
  const mainContent = document.querySelector(".board-article:has(.article-view)");

  // 게시글이면       자식클래스는    article-view 
  // 게시글이 아니면  자식클래스는    board-article-list 
  // 없으면(게시글이 아니면) 조기리턴
  if (!mainContent) {
    return;
  }

  // 버튼 만들기
  const extendButton = createExtendButton();
  mainContent.querySelector(".article-link").prepend(extendButton);

  // 조작할 요소들 가져오기
  // 그냥 html 태그 -> width-... 제거용
  const root = document.querySelector("html");
  const widthClassName = Array.from(root.classList).find(cls => cls.startsWith("width-"));
  const leftSideBar = document.querySelector("div.sidebar.left-ad-area");
  const rightSideBar = document.querySelector("aside.sidebar.right-sidebar");

  extendButton.addEventListener("click", () => {
    const isExtended = extendButton.getAttribute("data-extended") === "true";
    extendButton.setAttribute("data-extended", !isExtended);
    extendButton.innerHTML = isExtended
    ? `<span class="ion-arrow-expand icon"></span> 펼치기`
    : `<span class="ion-arrow-shrink icon"></span> 줄이기`;


    // 요소들 조작하기
    // 최대너비 제거하고 없앨거 없애기
    if (isExtended) {
      if (widthClassName) root.classList.add(widthClassName);
      mainContent.classList.remove("simya-extend-main-content");
      leftSideBar.classList.remove("simya-display-none");
      rightSideBar.classList.remove("simya-display-none");
    } else {
      if (widthClassName) root.classList.remove(widthClassName);
      mainContent.classList.add("simya-extend-main-content");
      leftSideBar.classList.add("simya-display-none");
      rightSideBar.classList.add("simya-display-none");
    }
  });
}


function createExtendButton() {
    const button = document.createElement("button");
    button.innerHTML = `<span class="ion-arrow-expand icon"></span> 펼치기`;
    button.title = "심야 확장 펼치기";
    button.setAttribute("data-extended", "false");
    button.classList.add("simya-extend-button", "btn", "btn-sm", "btn-arca", "btn-arca-article-write");
    return button;
  }
