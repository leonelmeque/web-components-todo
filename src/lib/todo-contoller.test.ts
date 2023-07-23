import {
  addNewTodo,
  filterByStatus,
  removeTodo,
  state,
  updateStatus,
} from "./todo-controller";

describe("Testing controller functionalities", () => {
  test("when a new todo is added", () => {
    addNewTodo("New todo", "marked");
    expect(state.length).toBe(1);
  });

  test("a todo should change is status from marked to not-marked", () => {
    updateStatus(state[0].id as string);
    expect(state[0].status).toBe("not-marked");
  });

  test("when a todo is removed state should be empty", () => {
    removeTodo(state[0].id as string);
    expect(state.length).toBe(0);
  });

  test("when user chooses to see only marked todos only marked are visible", () => {
    const res = filterByStatus("marked").findIndex(
      (item) => item.status === "not-marked"
    );
    expect(res).toEqual(-1);
  });

  test("when user chooses to see only no-marked todos only no-marked are visible", () => {
    const res = filterByStatus("not-marked").findIndex(
      (item) => item.status === "marked"
    );
    expect(res).toEqual(-1);
  });
});
