
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
 * @param {string} base64 str 타입 base64
 * @returns 
 */
function base64ToString(base64) {
    function base64ToBytes(base64) {
        const binString = atob(base64);
        return Uint8Array.from(binString, (m) => m.codePointAt(0));
    }

    try {
        const decodedString = new TextDecoder().decode(base64ToBytes(decodeURIComponent(base64)))
        return decodedString;
    } catch (error) {
        return null;
    }
}


// 예전 버젼
// utf-8 로 하는게 아닌거 같음
// 그래서 주소는 괜찮은데 나머지는 오류 남
// function base64ToString(base64) {
//     try {
//         return atob(base64);
//     } catch (error) {
//         return null;
//     }
// }