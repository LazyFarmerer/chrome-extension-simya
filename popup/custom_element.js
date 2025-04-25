class ChromeStorage {
  key;

  constructor(key) {
    this.key = key;
    if (!key) {
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

// 받는 정보: data-key=""            로컬저장의 키값
// 받는 정보: data-init=""           초기 지정값
// 받는 정보: data-description=""    옵션의 설명
// 생성하는 정보: data-value=""      로컬저장되어있던 값
customElements.define("switch-option", class SwitchOption extends HTMLElement {
  storage;
  fieldset;
  label;
  input;
  span;

  constructor() {
    super();
    // 키값 가져오기
    const key = this.getAttribute("data-key");
    this.storage = new ChromeStorage(key);
    this.createElement();
    // 저장된 정보 가져오기
    this.storage.get_storage((result) => {
      const initialValue = result[key] ?? (this.getAttribute("data-init") === "true");
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
      this.storage.set_storage(this.input.checked);
      this.setAttribute("data-value", this.input.checked);
    });

  }

  css = `   
@scope (switch-option) {
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


customElements.define("string-option", class StringOption extends HTMLElement {
  storage;
  input;
  button;

  constructor() {
    super();
    // 키값 가져오기
    const key = this.getAttribute("data-key");
    this.storage = new ChromeStorage(key);
    this.createElement();
    // 저장된 정보 가져오기
    this.storage.get_storage((result) => {
      const initialValue = result[key] ?? this.getAttribute("data-init");
      this.input.value = initialValue;
      this.addEvent();
    });
  }

  createElement() {
    // input 요소 생성
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = this.getAttribute("data-description") ?? "이거 입력하세요";

    // button 요소 생성
    this.button = document.createElement("button");
    this.button.textContent = "저장";

    // 요소 연결
    this.appendChild(this.input);
    this.appendChild(this.button);

    // 스타일 추가
    const style = document.createElement("style");
    this.appendChild(style);
    style.innerHTML = this.css;
  }

  addEvent() {
    // 엔터키 이벤트
    this.input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.saveValue();
      }
    });

    // 버튼 클릭 이벤트
    this.button.addEventListener("click", () => {
      this.saveValue();
    });
  }

  saveValue() {
    const value = this.input.value;
    this.storage.set_storage(value);
  }

  css = `
@scope (string-option) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.05rem 0.5rem;  /* 위아래 패딩을 0.5rem에서 0.25rem으로 줄임 */
  border-radius: 0.5rem;
  background-color: var(--background-light-color);
  border: 2px solid var(--primary-light-color);

  input {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    background-color: transparent;
    color: var(--primary-light-color);
    font-size: 1rem;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: var(--primary-light-color);
    opacity: 0.7;
  }

  /* 버튼 스타일을 :host 선택자로 변경 */
  :host button {
    display: inline-block;
    padding: 10px 15px;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    background-color: var(--primary-light-color);
    color: var(--background-light-color);
    transition: background-color 0.3s, color 0.3s;
  }

  :host button:hover {
    text-decoration: underline;
    outline-style: solid;
    outline-width: 2px;
    background-color: var(--background-light-color);
    color: var(--primary-light-color);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--background-dark-color);
    border-color: var(--primary-dark-color);

    input {
      color: var(--primary-dark-color);
    }

    input::placeholder {
      color: var(--primary-dark-color);
      opacity: 0.7;
    }

    :host button {
      background-color: var(--primary-dark-color);
      color: var(--background-dark-color);
    }

    :host button:hover {
      background-color: var(--background-dark-color);
      color: var(--primary-dark-color);
    }
  }
}
  `;
});
