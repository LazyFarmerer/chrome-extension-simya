

replaceElementTextContent();



// 대충 글 태그들 가져와서 변환가능한걸 찾아서 변환
function replaceElementTextContent() {
    // 글 요소들 찾기
    const pElements = document.querySelectorAll(".article-content>p");
    const tableElements = document.querySelectorAll(".article-content>table");
    const allElements = [...pElements, ...tableElements];

    allElements.forEach((element) => {
        // 변환요소 없다면 조기리턴
        const textContent = element.textContent;
        const regExpMatchText = matchUrlToBase64(textContent);
        if (regExpMatchText === null) {
            return;
        }

        // 있다면 변환시키고 a 태크로 감쌈 => 바꾸기
        // 그와중에 오류나면 그냥 패스하기
        const url = base64ToString(regExpMatchText)
        if (url === null) {
            return;
        }

        const replaceText = textContent.replace(regExpMatchText, tagA(url));
        element.innerHTML = replaceText;
    });
}


function tagA(link) {
    // const a = document.createElement("a");
    // a.setAttribute("href", link);
    // a.setAttribute("target", "_blank");
    // a.textContent = link;
    // return a;
    return `<a href="${link}" target="_blank">${link}</a>`;
}