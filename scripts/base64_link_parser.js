


// 메인 글 파싱
parseMainContent();

// 댓글 파싱
document.querySelectorAll("div.list-area > div.comment-wrapper").forEach((comment) => {
    parseComments(comment);
});





// 메인 글 파싱
function parseMainContent() {
    // 글 요소들 찾기
    document.querySelectorAll(".article-content > :where(p, div, table, summary > p)")
    .forEach(replaceBase64Urls);
}

// 댓글 파싱
function parseComments(commentElement) {
    const comment = commentElement
        .querySelector("div.comment-item > div.content > div.message")
        .querySelector("div.text, div.emoticon-wrapper, div.combo_emoticon-wrapper");

    // 글자가 있다면 text
    // 아카콘이 있다면 emoticon-wrapper
    // 콤보 아카콘이면 combo_emoticon-wrapper
    if (comment.classList[0] === "text") {
        replaceBase64Urls(comment);
    }

    // 만약 대댓글이 있다면 한번 더 파싱
    commentElement
    .querySelectorAll("& > div.comment-wrapper")
    .forEach(parseComments);
}

// 글이 있는 태그요소 중 base64 로 변환 된 주소 찾아서 디코딩
function replaceBase64Urls(element) {
    // 변환요소 없다면 조기리턴
    // textContent 안쓰고 innerHTML 쓰는 이유: 띄어쓰기 등 모두 사라져서
    const htmlContent = element.innerHTML;
    const regExpMatchText = matchUrlToBase64(htmlContent);
    if (regExpMatchText === null) {
        return;
    }

    // 있다면 변환시키고 a 태크로 감쌈 => 바꾸기
    // 그와중에 오류나면 그냥 패스하기
    const url = base64ToString(regExpMatchText)
    if (url === null) {
        return;
    }

    const updatedContent = htmlContent.replace(regExpMatchText, aTag(url, regExpMatchText));
    element.innerHTML = updatedContent;
}


function aTag(link, base64) {
    // const a = document.createElement("a");
    // a.setAttribute("href", link);
    // a.setAttribute("target", "_blank");
    // a.textContent = link;
    // return a;
    return `<a href="${link}" title="${base64} (심야 프로그램에 의한 변환)" target="_blank">${link}</a>`;
}
