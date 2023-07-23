import ListContainer from "../components/list-container/component";
import { idGenerator } from "./id-generator";
import Todo from "./todo";

export const state: Todo[] = [];

export const initTodos = () => {
  state.push(new Todo("989", "Go to the super market", "marked"));
  state.push(new Todo("929", "Go to the moutain", "not-marked"));
  state.push(new Todo("489", "Drink Coffee", "marked"));
  state.push(new Todo("589", "Do home work", "not-marked"));
  state.push(new Todo("689", "Call the store", "marked"));

  return state;
};

export const addNewTodo = (todo: string, status: Todo["status"]) => {
  const newID = idGenerator();
  const item = new Todo(newID, todo, status);

  state.push(item);

  if (document.querySelector("wc-list-container")) {
    (
      document.querySelector("wc-list-container") as ListContainer
    ).dataset.list = JSON.stringify(state);
  }
};

export const removeTodo = (id: string) => {
  const index = state.findIndex((item) => item.id === id);
  state.splice(index, 1);
  if (document.querySelector("wc-list-container")) {
    (
      document.querySelector("wc-list-container") as ListContainer
    ).dataset.list = JSON.stringify(state);
  }
};

export const updateStatus = (id: string) => {
  const index = state.findIndex((item) => item.id === id);
  state[index].status = Todo.changeStatus(state[index].status);

  if (document.querySelector("wc-list-container")) {
    (
      document.querySelector("wc-list-container") as ListContainer
    ).dataset.list = JSON.stringify(state);
  }
};

export const filterByStatus = (status: "all" | "marked" | "not-marked") => {
  const list =
    status === "all" ? state : state.filter((item) => item.status === status);

  if (document.querySelector("wc-list-container")) {
    (
      document.querySelector("wc-list-container") as ListContainer
    ).dataset.list = JSON.stringify(list);
  }

  return list;
};

export const cleanCompleted = () => {
  const uids: string[] = [];

  state.forEach((item) => {
    if (item.status === "marked") uids.push(item.id as string);
  });

  for (const uid of uids) {
    const idx = state.findIndex((item) => item.id === uid);

    state.splice(idx, 1);
  }

  if (document.querySelector("wc-list-container")) {
    const container = document.querySelector(
      "wc-list-container"
    ) as ListContainer;

    container.dataset.list = JSON.stringify(state);
  }
};
