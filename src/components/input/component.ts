import Template from "./template";

export default class Input extends HTMLElement {
  handleKeyDown?: null | Function;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    (this.shadowRoot as ShadowRoot).innerHTML = Template.render();
    this.setupListeners()
  }

  setupListeners() {
    const input = this.shadowRoot?.querySelector("#input") as HTMLInputElement;
    input?.addEventListener("keydown", (event) => {
      if (typeof this.handleKeyDown === "function") {
        event.key === "Enter" && this.handleKeyDown(event);
      }
    });
  }
}

if (!customElements.get("wc-input")) {
  customElements.define("wc-input", Input);
}
