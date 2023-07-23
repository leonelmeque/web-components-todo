import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import Component from "./component";

describe("Given an input", () => {
  test("user enters text abcde and hits enter", () => {
    const container = document.createElement("wc-input", {
      is: Component as any,
    }) as Component;

    const handleKeyDown = jest.fn();
    container.handleKeyDown = handleKeyDown;

    document.body.appendChild(container);

    const input = document
      .querySelector("wc-input")
      ?.shadowRoot?.querySelector("#input") as HTMLInputElement;
    expect(input).toBeTruthy();

    fireEvent.change(input, {
      target: {
        value: "abcde",
      },
    });

    expect(input.value).toBe("abcde");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(handleKeyDown).toBeCalledTimes(1);
  });
});
