


// 메인 글 파싱
contentsParser();

// 댓글 파싱
document.querySelectorAll("div.list-area > div.comment-wrapper").forEach((comment) => {
    commentParser(comment);
});





// 메인 글 파싱
function contentsParser() {
    // 글 요소들 찾기
    const pElements = document.querySelectorAll(".article-content > p");
    const tableElements = document.querySelectorAll(".article-content > table");
    const allElements = [...pElements, ...tableElements];

    allElements.forEach(replaceElementTextContent);
}

// 댓글 파싱
function commentParser(commentElement) {
    const commentData = commentElement.querySelector("div.comment-item > div.content > div.message");
    // 글자가 있다면 text
    // 아카콘이 있다면 emoticon-wrapper
    // 콤보 아카콘이면 combo_emoticon-wrapper
    const comment = commentData.querySelector("div.text, div.emoticon-wrapper, div.combo_emoticon-wrapper")
    if (comment.classList[0] === "text") {
        replaceElementTextContent(comment)
    }

    // 만약 대댓글이 있다면 한번 더 파싱
    const commentInComments = commentElement.querySelectorAll("& > div.comment-wrapper");
    commentInComments.forEach((comment) => {
        commentParser(comment);
    });
}

// 글이 있는 태그요소 중 base64 로 변환 된 주소 찾아서 디코딩
function replaceElementTextContent(element) {
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

    const replaceText = textContent.replace(regExpMatchText, aTag(url, regExpMatchText));
    element.innerHTML = replaceText;
}


function aTag(link, base64) {
    // const a = document.createElement("a");
    // a.setAttribute("href", link);
    // a.setAttribute("target", "_blank");
    // a.textContent = link;
    // return a;
    return `<a href="${link}" title="${base64} (심야 프로그램에 의한 변환)" target="_blank">${link}</a>`;
}
