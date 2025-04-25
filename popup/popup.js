

const current_manifest_version_element = document.getElementById("current_manifest_version");
const github_manifest_version_element = document.getElementById("github_manifest_version");
const version_check_result = document.getElementById("check-result");
const version_check_button = document.getElementById("version_check");

// 지금 버젼 가져오기
requests("./../manifest.json")
.then((current_manifest) => {
  current_manifest_version_element.textContent = current_manifest.version;
});

// 버전확인 버튼 클릭 시
document.getElementById("version_check").onclick = async () => {
  await checkVersion();
};

// 설정 초기화 버튼 누름
document.getElementById("option_reset").addEventListener("click", (event) => {
  // 커스텀 옵션들 돌면서 로컬 삭제 & data-init 정보대로 스위치 바꾸기
  document.querySelectorAll("switch-option")
  .forEach((switch_option) => {
    switch_option.input.checked = (switch_option.getAttribute("data-init") === "true");
    switch_option.storage.remove_storage();
  });

  // string-option 초기화
  document.querySelectorAll("string-option")
  .forEach((string_option) => {
    string_option.input.value = string_option.getAttribute("data-init");
    string_option.storage.remove_storage();
  });
})

// 출처: https://stackoverflow.com/questions/16751345/automatically-close-all-the-other-details-tags-after-opening-a-specific-detai#answer-56194608
// 1. details 태그들 찾아서 반복문 돌면서 toggle 이벤트 리스너
// 2. 이벤트 내용은 반복문 돌면서 선택된 객체가 아니면 닫기
document.querySelectorAll('details').forEach((details, index, detailsArray) => {
  details.addEventListener("toggle", () => {
    if (details.open) {
      detailsArray.forEach((details2) => {
        if (details != details2 && details2.open) {
          details2.open = false;
        }
      });
    }
  });
});

async function checkVersion() {
  version_check_result.classList.remove("display-none");
  version_check_button.classList.add("display-none");

  const github_manifest = await requests("https://cdn.jsdelivr.net/gh/LazyFarmerer/chrome-extension-simya@main/manifest.json");

  github_manifest_version_element.textContent = github_manifest.version;
  const result = (current_manifest_version_element.textContent === github_manifest.version)
          ? "같은 버전이네요 :D"
          : "버전이 다르네요 :<";

  version_check_result.textContent = result;
}



async function requests(url) {
  const req = await fetch(url);
  return req.json();
}