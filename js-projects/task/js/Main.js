import { Task } from "./Task.js";

class Main {
  constructor() {
    this.tasks = [];
    this.taskList = document.querySelector("#task-list");
    this.taskStatus = document.querySelector("#task-status");
  }

  async load() {
    try {
      const response = await fetch("./data/tasks.json");
      if (!response.ok) {
        throw new Error(`Could not load tasks (${response.status}).`);
      }

      const taskData = await response.json();
      if (!Array.isArray(taskData)) {
        throw new Error("The tasks data must be a JSON array.");
      }

      this.tasks = taskData.map((taskDataItem) => new Task(taskDataItem, () => this.updateStatus()));
      this.render();
    } catch (error) {
      console.error(error);
      this.taskStatus.textContent = "Tasks could not be loaded. Please try again later.";
    }
  }

  updateStatus() {
    const remaining = this.tasks.filter((task) => !task.completed).length;
    this.taskStatus.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} remaining`;
  }

  render() {
    this.taskList.replaceChildren(...this.tasks.map((task) => task.render()));
    this.updateStatus();
  }
}

new Main().load();
