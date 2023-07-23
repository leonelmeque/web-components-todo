import "./style.css";
import "./components/list-item/component.ts";
import "./components/list-container/component.ts";
import "./components/input/component.ts";
import "./components/footer/component.ts";
import "./components/header/components.ts";
import { addNewTodo, state, initTodos } from "./lib/todo-controller.ts";
import Input from "./components/input/component.ts";
import Header from "./components/header/components.ts";

initTodos();
const activeTheme = document.body.classList.contains("theme--dark")
  ? "dark"
  : "light";

const setupListeners = () => {
  // Input listeners
  const wcInput = document.querySelector("wc-input") as Input;
  wcInput.handleKeyDown = (event: MouseEvent) => {
    addNewTodo((event.target as HTMLInputElement).value, "not-marked");
    (event.target as HTMLInputElement).value = "";

    (event.target as HTMLInputElement).focus();
  };

  // header listeners
  const wcHeader = document.querySelector("wc-header") as Header;

  wcHeader.toggleTheme = () => {
    if (document.body.classList.contains("theme--dark")) {
      document.body.classList.toggle("theme--dark");
      document.body.classList.toggle("theme--light");
      wcHeader.setAttribute("active-theme", "light");
    } else {
      document.body.classList.toggle("theme--light");
      document.body.classList.toggle("theme--dark");
      wcHeader.setAttribute("active-theme", "dark");
    }
  };
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="backdrop">
 <wc-header active-theme="${activeTheme}"></wc-header>
  <main>
   <div class="container">
      <wc-input></wc-input>
      <wc-list-container data-list='${JSON.stringify(state)}'>
      </wc-list-container>
    </div>
  </main>
`;

setupListeners();
