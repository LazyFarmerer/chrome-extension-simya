const a = "aHR0cHM6Ly9raW9zay5hYy9jLzAxMm8yYjM2MksxUzIwMUEyVjJvME0wZjF1MHcwSjFp";

function matchUrlToBase64(str) { // ["결과"] or null
    return str.match(/aHR0[0-9a-zA-Z_]+={0,2}/g);
}

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

console.log(base64ToString(matchUrlToBase64(a)));