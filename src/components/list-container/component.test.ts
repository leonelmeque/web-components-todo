import { initTodos } from "../../lib/todo-controller";
import Component from "./component";
import "../list-item/component";
import { renderContainer } from "../../test-utils";

describe("list-container rendering tests", () => {
  test("given a list of 5 todos it renders all 5", () => {
    const { container } = renderContainer<Component>(
      "wc-list-container",
      Component
    );

    container.dataset.list = JSON.stringify(initTodos());

    expect(container.shadowRoot?.querySelectorAll("wc-list-item").length).toBe(
      5
    );
  });
});
