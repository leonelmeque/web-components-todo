import { initTodos } from "../../lib/todo-controller";
import Component from "./component";
import "../list-item/component";
import { renderContainer } from "../../test-utils";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/dom";

describe("footer rendering tests", () => {
  test("given a list of 5 todos it shows 5 items left in the footer", () => {
    const { container } = renderContainer<Component>("wc-footer", Component);

    container.dataset.list = "" + initTodos().length;
    const div = container.shadowRoot?.querySelector("#items-left");

    expect(div).toHaveTextContent(/5 items left/i);
  });

  test("when completed button is click footer shows 3 items left", () => {
    const { container } = renderContainer<Component>("wc-footer", Component);

    const mockFunction = jest.fn();
    container.handleClickActive = mockFunction;
    container.handleClickAll = mockFunction;
    container.handleClickCompleted = mockFunction;
    container.handleClickClear = mockFunction;

    container.dataset.list = "" + initTodos().length;
    const activeBtn = container.shadowRoot?.querySelectorAll("button");

    fireEvent.click((activeBtn as NodeList)[0]);
    fireEvent.click((activeBtn as NodeList)[1]);
    fireEvent.click((activeBtn as NodeList)[2]);
    fireEvent.click((activeBtn as NodeList)[3]);

    expect(mockFunction).toBeCalledTimes(4);
  });
});
