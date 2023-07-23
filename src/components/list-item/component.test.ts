import { renderContainer } from "../../test-utils";
import Component from "./component";

describe("wc-list-item rendering tests", () => {
  test("renders a todo with name abcd", () => {
    const { container } = renderContainer<Component>("wc-list-item", Component);

    container.handleClick = jest.fn(() => {
      console.log("clicked");
    });

    container.setAttribute("status", "marked");
    container.setAttribute("id", "1");
    container.setAttribute("todo", "abcd");

    expect(container.getAttribute("todo")).toBe("abcd");
  });
});
