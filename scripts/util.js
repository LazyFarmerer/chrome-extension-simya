
/**
 * base64로 이루어진 url주소가 있다면 반환
 * 
 * 없으면 null 반환
 * 
 * @param {string} str 
 * @returns 
 */
function matchUrlToBase64(str) { // ["결과"] or null
    return str.match(/aHR0[0-9a-zA-Z_]+={0,2}/g);
}


/**
 * base64 를 문자열로 변환
 * 
 * 오류시 null 반환
 * 
 * @param {string} base64 
 * @returns 
 */
function base64ToString(base64) {
    try {
        return atob(base64);
    } catch (error) {
        return null;
    }
}