

const current_manifest_version_element = document.getElementById("current_manifest_version");
const github_manifest_version_element = document.getElementById("github_manifest_version");
const check_result = document.getElementById("check-result");
const version_check_button = document.getElementById("version_check");

setTimeout(async () => {
    const current_manifest = await requests("./../manifest.json");
    current_manifest_version_element.textContent = current_manifest.version;
}, 500);

document.getElementById("version_check").onclick = async () => {
    await version_check();
  };


async function version_check() {

    check_result.classList.remove("display-none");
    version_check_button.classList.add("display-none");

    const github_manifest = await requests("https://cdn.jsdelivr.net/gh/LazyFarmerer/chrome-extension-simya@main/manifest.json");

    github_manifest_version_element.textContent = github_manifest.version;
    const result = (current_manifest_version_element.textContent === github_manifest.version)
                    ? "같은 버전이네요 :D"
                    : "버전이 다르네요 :<";

    check_result.textContent = result;
}



async function requests(url) {
    const req = await fetch(url);
    return req.json();
}