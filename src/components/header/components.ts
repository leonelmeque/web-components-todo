import Template from "./template";

export default class Header extends HTMLElement {
  toggleTheme?: Function;
  activeTheme: "light" | "dark";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.activeTheme = "dark";
  }

  connectedCallback() {
    this.activeTheme = this.getAttribute("active-theme") as "light" | "dark";
    this.renderHeader();
  }

  attributeChangedCallback(name: string, _oldAttr: string, newAttr: string) {
    if (name === "active-theme") {
      this.activeTheme = newAttr as "light" | "dark";
      this.renderHeader();
    }
  }

  static get observedAttributes() {
    return ["active-theme"];
  }

  disconnectedCallback() {
    const listeners = this.queryListeners();

    Object.values(listeners).forEach((listener) => {
      listener?.removeEventListener("click", () => this.toggleTheme);
    });
  }

  queryListeners() {
    const darkBtn = this.shadowRoot?.querySelector(".theme-icon--dark");
    const lightBtn = this.shadowRoot?.querySelector(".theme-icon--light");

    return { darkBtn, lightBtn } as const;
  }

  setupListeners() {
    const { darkBtn, lightBtn } = this.queryListeners();

    darkBtn?.addEventListener("click", () => {
      if (typeof this.toggleTheme === "function") {
        this.toggleTheme();
      }
    });

    lightBtn?.addEventListener("click", () => {
      if (typeof this.toggleTheme === "function") {
        this.toggleTheme();
      }
    });
  }

  renderHeader() {
    (this.shadowRoot as ShadowRoot).innerHTML = Template.render({
      activeTheme: this.activeTheme,
    });
    this.setupListeners();
  }
}

if (!customElements.get("wc-header")) {
  customElements.define("wc-header", Header);
}
