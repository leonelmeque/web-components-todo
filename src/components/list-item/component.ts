import Template, { type ListItemProps } from "./template";

export default class ListItem extends HTMLElement {
  _props: string[] = ["status", "id", "todo"];
  handleClick?: null | Function;
  handleDelete?: null | Function;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    (this.shadowRoot as ShadowRoot).innerHTML = Template.render(
      this.mapAttrToComponent()
    );
    this.setupListeners();
  }

  disconnectCallaback() {
    const checkbox = this.shadowRoot?.querySelector("input");
    const span = this.shadowRoot?.querySelector(".todo__item-remove-icon");

    this.handleClick && checkbox?.removeEventListener("click", () => {});
    this.handleDelete && span?.removeEventListener("click", () => {});
  }

  static get observedAttributes() {
    return ["status", "id", "todo"];
  }

  serialize() {
    return {
      id: this.getAttribute("id"),
      status: this.getAttribute("status"),
      todo: this.getAttribute("todo"),
    };
  }

  setupListeners() {
    const checkbox = this.shadowRoot?.querySelector("input");
    const span = this.shadowRoot?.querySelector(".todo__item-remove-icon");

    checkbox?.addEventListener("click", (event) => {
      if (typeof this.handleClick === "function") {
        this.handleClick(event);
      }
    });

    span?.addEventListener("click", (event) => {
      if (typeof this.handleDelete === "function") {
        this.handleDelete(event);
      }
    });
  }

  addProps(props: any) {
    for (let i = 0; i < this._props.length; i++) {
      if (props[this._props[i]]) {
        this.setAttribute(this._props[i], props[this._props[i]]);
      }
    }
  }

  mapAttrToComponent() {
    let params: { [keyof: string]: any } = {};

    for (let i = 0; i < this._props.length; i++) {
      params[this._props[i]] = this.getAttribute(this._props[i]);
    }

    return params as ListItemProps;
  }

  static toAttributeString(obj: any) {
    let attr = "";

    for (let key in obj) {
      if (obj[key]) attr += key + '="' + obj[key] + '" ';
    }

    return attr;
  }
}

if (!customElements.get("wc-list-item")) {
  customElements.define("wc-list-item", ListItem);
}
