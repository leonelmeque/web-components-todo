import Todo from "../../lib/todo";
import {
  cleanCompleted,
  filterByStatus,
  removeTodo,
  updateStatus,
} from "../../lib/todo-controller";
import Footer from "../footer/component";
import ListItem from "../list-item/component";
import Template from "./template";

export default class ListContainer extends HTMLElement {
  totalItems?: string;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    (this.shadowRoot as ShadowRoot).innerHTML = Template.render();

    if (this.getAttribute("data-list")) {
      this.renderList();
    }

    this.renderFooter();
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (name === "data-list") {
      if (oldVal !== newVal) {
        this.renderList();
        const footer = this.shadowRoot?.querySelector("wc-footer") as Footer;

        footer.dataset.list = this.totalItems;
      }
    }
  }

  static get observedAttributes() {
    return ["data-list"];
  }

  handleToggleStatus(status: "all" | "marked" | "not-marked") {
    return (_event: MouseEvent) => {
      filterByStatus(status);
    };
  }

  handleClearCompleted(_event: MouseEvent) {
    cleanCompleted();
  }

  onHandleClick(id: string) {
    return (_event: MouseEvent) => {
      updateStatus(id);
    };
  }

  onDeleteClick(id: string) {
    return (_event: MouseEvent) => {
      removeTodo(id);
    };
  }

  renderList() {
    const data = JSON.parse(this.dataset.list as string) as Todo[];
    const ul = this.shadowRoot?.querySelector("ul") as HTMLUListElement;
    this.totalItems = String(data.length);

    if (ul.children.length !== 0) {
      ul.innerHTML = "";
    }

    for (let i = 0; i < data.length; i++) {
      const item = document.createElement("wc-list-item") as ListItem;

      item.handleClick = this.onHandleClick(data[i].id as string);
      item.handleDelete = this.onDeleteClick(data[i].id as string);
      item.addProps({ ...data[i] });

      this.shadowRoot?.querySelector("ul")?.appendChild(item);
    }
  }

  renderFooter() {
    const footer = document.createElement("wc-footer") as Footer;
    footer.setAttribute("slot", "footer");
    footer.setAttribute("data-list", String(this.totalItems));

    footer.handleClickAll = this.handleToggleStatus("all");
    footer.handleClickActive = this.handleToggleStatus("not-marked");
    footer.handleClickClear = this.handleClearCompleted;
    footer.handleClickCompleted = this.handleToggleStatus("marked");

    this.shadowRoot?.querySelector('slot[name="footer"]')?.appendChild(footer);
  }
}

if (!customElements.get("wc-list-container")) {
  customElements.define("wc-list-container", ListContainer);
}
