import Template from "./template";

export default class Footer extends HTMLElement {
  handleClickAll?: null | Function;
  handleClickActive?: null | Function;
  handleClickClear?: null | Function;
  handleClickCompleted?: null | Function;
  itemsLeft?: number;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.renderFooter();
  }

  disconnectCallback() {
    const listeners = this.queryListeners();

    Object.values(listeners).forEach((element) => {
      element?.removeEventListener("click", () => {});
    });
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (name === "data-list") {
      if (oldVal !== newVal) {
        this.renderFooter();
      }
    }
  }

  static get observedAttributes() {
    return ["data-list"];
  }

  queryListeners() {
    const allButton = (this.shadowRoot as ShadowRoot).querySelector(
      'button[name="All"]'
    );

    const activeButton = (this.shadowRoot as ShadowRoot).querySelector(
      'button[name="Active"]'
    );

    const completedButton = (this.shadowRoot as ShadowRoot).querySelector(
      'button[name="Completed"]'
    );

    const clearAll = (this.shadowRoot as ShadowRoot).querySelector(
      'button[name="Clear"]'
    );

    return {
      allButton,
      activeButton,
      completedButton,
      clearAll,
    };
  }

  setupListners() {
    const { activeButton, allButton, completedButton, clearAll } =
      this.queryListeners();

    allButton?.addEventListener("click", (event) => {
      if (typeof this.handleClickAll === "function") {
        this.handleClickAll(event);
      }
    });

    activeButton?.addEventListener("click", () => {
      typeof this.handleClickActive === "function" && this.handleClickActive();
    });

    completedButton?.addEventListener("click", () => {
      typeof this.handleClickCompleted === "function" &&
        this.handleClickCompleted();
    });

    clearAll?.addEventListener("click", () => {
      typeof this.handleClickClear === "function" && this.handleClickClear();
    });
  }

  renderFooter() {
    this.itemsLeft = JSON.parse(this.getAttribute("data-list") as string);

    (this.shadowRoot as ShadowRoot).innerHTML = Template.render({
      itemsLeft: Number(this.itemsLeft),
    });

    this.setupListners();
  }
}

if (!customElements.get("wc-footer")) {
  customElements.define("wc-footer", Footer);
}
