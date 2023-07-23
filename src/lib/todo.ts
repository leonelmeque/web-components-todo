export default class Todo {
  id: string | number;
  todo: string;
  status: "marked" | "not-marked";

  constructor(
    id: string | number,
    todo: string,
    status: "marked" | "not-marked"
  ) {
    this.id = id;
    this.todo = todo;
    this.status = status;
  }

  static changeStatus(status: "marked" | "not-marked") {
    return status === "marked" ? "not-marked" : "marked";
  }
}
