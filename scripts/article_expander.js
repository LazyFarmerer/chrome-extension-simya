

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
  // mainContent.querySelector(".article-menu").prepend(extendButton);

  // 조작할 요소들 가져오기
  // 그냥 html 태그 -> width-1300 제거용
  const root = document.querySelector("html");
  const leftSideBar = document.querySelector("div.sidebar.left-ad-area");
  const rightSideBar = document.querySelector("aside.sidebar.right-sidebar");

  extendButton.addEventListener("click", () => {
    const isExtended = extendButton.getAttribute("data-extended") === "true";
    extendButton.setAttribute("data-extended", !isExtended);
    extendButton.textContent = isExtended ? "펼치기" : "줄이기";


    // 요소들 조작하기
    // 최대너비 제거하고 없앨거 없애기
    if (isExtended) {
      root.classList.add("width-1300");
      mainContent.classList.remove("simya-extend-main-content");
      leftSideBar.classList.remove("simya-display-none");
      rightSideBar.classList.remove("simya-display-none");
    } else {
      root.classList.remove("width-1300");
      mainContent.classList.add("simya-extend-main-content");
      leftSideBar.classList.add("simya-display-none");
      rightSideBar.classList.add("simya-display-none");
    }
  });
}


function createExtendButton() {
    const button = document.createElement("button");
    button.textContent = "펼치기";
    button.setAttribute("data-extended", "false");
    button.classList.add("simya-extend-button", "btn", "btn-sm", "btn-arca", "btn-arca-article-write");
    return button;
  }







// if (articleWrapper) {
//   const articleLink = articleWrapper.querySelector(".article-link");
//   const extendButtonElement = extendButton();
//   const shrinkButtonElement = shrinkButton();
  
//   articleLink.prepend(extendButtonElement);
//   articleLink.prepend(shrinkButtonElement);

//   extendButtonElement.addEventListener("click", () => {
//     console.log("펼치기");
//     extendButtonElement.classList.add("simya-display-none");
//     shrinkButtonElement.classList.remove("simya-display-none");
//   });

//   shrinkButtonElement.addEventListener("click", () => {
//     console.log("줄이기");
//     extendButtonElement.classList.remove("simya-display-none");
//     shrinkButtonElement.classList.add("simya-display-none");
//   });
// }


// function extendButton() {
//     const button = document.createElement("button");
//     button.textContent = "펼치기";
//     button.classList.add("simya-extend-button", "btn", "btn-sm", "btn-arca", "btn-arca-article-write");
//     return button;
//   }

// function shrinkButton() {
//   const button = document.createElement("button");
//   button.textContent = "줄이기";
//   button.classList.add("simya-shrink-button", "simya-display-none", "btn", "btn-sm", "btn-arca", "btn-arca-article-write");
//   return button;
// }
