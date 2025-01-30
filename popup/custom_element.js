
// 받는 정보: data-key=""            로컬저장의 키값
// 받는 정보: data-init=""           초기 지정값
// 받는 정보: data-description=""    옵션의 설명
// 생성하는 정보: data-value=""      로컬저장되어있던 값
class Storage extends HTMLElement {
  key;

  constructor() {
    super();
    // 키값 가져오기
    this.key = this.getAttribute("data-key");
    if (!this.key) {
      throw new Error('data-key="" 값이 없음');
    }
  }

  get_storage(callbackFunction) {
    // if (chrome ?? false) return;
    chrome.storage.local.get(this.key, callbackFunction);
  }
  set_storage(value, callbackFunction) {
    // if (chrome ?? false) return;
    chrome.storage.local.set({ [this.key]: value }, callbackFunction);
  }
  remove_storage(callbackFunction) {
    chrome.storage.local.remove( [this.key], callbackFunction);
  }
}

customElements.define("custom-option", class CustomOption extends Storage {
  fieldset;
  label;
  input;
  span;

  constructor() {
    super();
    this.createElement();
    // 저장된 정보 가져오기
    this.get_storage((result) => {
      const initialValue = result[this.key] ?? this.getAttribute("data-init") === "true";
      this.setAttribute("data-value", initialValue);
      this.input.checked = initialValue;
      this.addEvent();
    });
  }

  createElement() {
    // 구성
    // <fieldset>
    //   <label>
    //     <input role="switch" type="checkbox" />
    //     <span class="switch"></span>
    //     <span class="description"></span>
    //   </label>
    // </fieldset>
    // <style></style>
    this.fieldset = document.createElement("fieldset");

    this.label = document.createElement("label");

    this.input = document.createElement("input");
    this.input.setAttribute("role", "switch");
    this.input.setAttribute("type", "checkbox");

    // 스위치를 위한 span
    const switchSpan = document.createElement("span");
    switchSpan.classList.add("switch");

    // 설명을 위한 span
    this.span = document.createElement("span");
    this.span.classList.add("description");
    this.span.textContent = this.getAttribute("data-description") ?? "data-description 까먹었다 입력하자";

    // 요소 연결
    this.appendChild(this.fieldset);
    this.fieldset.appendChild(this.label);
    this.label.appendChild(this.input);
    this.label.appendChild(switchSpan);
    this.label.appendChild(this.span);

    // 스타일 추가
    const style = document.createElement("style");
    this.appendChild(style);
    style.innerHTML = this.css;
  }

  addEvent() {
    this.input.addEventListener("change", (event) => {
      this.set_storage(this.input.checked);
      this.setAttribute("data-value", this.input.checked);
    });
  }

  css = `   
@scope (custom-option) {
  fieldset {
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* 스위치와 설명 간 간격 추가 */
  }

  /* 스위치 체크박스 숨기기 */
  input[type="checkbox"][role="switch"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* 스위치 스타일 */
  .switch {
    position: relative;
    display: inline-block;
    width: 40px; /* 스위치 길이 */
    height: 20px; /* 스위치 높이 */
    background-color: var(--background-light-color);
    border-radius: 20px;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;

    border-width: 2px;
    border-style: solid;
    border-color: var(--primary-light-color);
  }

  /* 스위치의 동그라미 */
  .switch::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: var(--primary-light-color);
    border-radius: 50%;
    transition: transform 0.3s ease-in-out,
          background-color 0.3s ease-in-out;
  }

  /* 체크 상태 */
  input[type="checkbox"][role="switch"]:checked + .switch {
    background-color: var(--accent-light-color);
  }

  input[type="checkbox"][role="switch"]:checked + .switch::before {
    transform: translateX(20px); /* 동그라미 이동 거리 */
    background-color: var(--background-light-color);
  }

  /* 설명 스타일 */
  span.description {
    margin-left: 5px;
    white-space: nowrap; /* 한 줄에 표시 */
  }

  @media (prefers-color-scheme: dark) {
    .switch {
      background-color: var(--background-dark-color);
      border-color: var(--primary-dark-color);
    }
    .switch::before {
      background-color: var(--primary-dark-color);
    }
    input[type="checkbox"][role="switch"]:checked + .switch {
      background-color: var(--accent-dark-color);
  }
  }
}
  `;
});
