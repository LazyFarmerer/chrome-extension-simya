


chrome.storage.local.get("use_ad_block", (result) => {
  if (!(result.use_ad_block ?? false)) {
    return;
  }

  document.querySelectorAll("div.ad")
  .forEach((ad) => {
    createObserver()
    .observe(ad, {
      childList: true, // 자식 요소 변경을 감지
      subtree: false,  // 자식의 자식까지는 감지하지 않음
    });
  });
});


function createObserver() {
  // MutationObserver 클래스는 DOM 변화를 감지하는거란다 와 세상에
  return new MutationObserver((mutationsList, obs) => {
    // 관찰 해제
    obs.disconnect();

    mutationsList.forEach((mutation) => {
      // 이벤트 내용이 자식이 만들어진게 아니라면 조기리턴
      if (mutation.type !== "childList") {
        return;
      }

      // 자식요소가 변경이 있고
      // 그 자식이 span 태그 라면
      const targetElement = mutation.target;
      if (targetElement.querySelector(":scope > span")) {
        appendBlockElement(targetElement);
      }
    });
  });
}


// 아무런 이벤트도 없는 부모보다 살짝 큰 배경화면 div 만들어서 추가
function appendBlockElement(adElement) {
  const div = document.createElement("div");
  div.setAttribute("class", "simya-block");
  adElement.prepend(div);
  div.title = "심야 프로그램에 의한 가림";

  // 높이가 더 크다 -> 위아래로 길쭉하다
  if (div.offsetWidth < div.offsetHeight) {
    div.classList.add("simya-block-vertical");  
  }
}