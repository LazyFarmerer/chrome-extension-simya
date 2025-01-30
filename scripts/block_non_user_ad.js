

// MutationObserver 클래스는 DOM 변화를 감지하는거란다 와 세상에
const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    // 관찰 해제
    observer.disconnect();

    if (mutation.type !== "childList") {
      return;
    }

    // 자식요소가 변경이 있고
    // 그 자식이 span 태그 라면
    const targetElement = mutation.target;
    if (targetElement.querySelector("& > span")) {
      appendBlockElement(targetElement);
    }
  });
});


document.querySelectorAll("div.ad")
.forEach((ad) => {
  observer.observe(ad, {
    childList: true, // 자식 요소 변경을 감지
    subtree: false,  // 자식의 자식까지는 감지하지 않음
  });
});


// 아무런 이벤트도 없는 부모보다 살짝 큰 배경화면 div 만들어서 추가
function appendBlockElement(adElement) {
  const div = document.createElement("div");
  adElement.append(div);
  div.title = "심야 프로그램에 의한 가림";
  div.style = `
    position: absolute;
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background-color: var(--color-bg-main);
  `;

  // 높이가 더 크다 -> 위아래로 길쭉하다
  if (div.offsetWidth < div.offsetHeight) {
    div.style.backgroundColor = "var(--color-bg-body)";
  }
}