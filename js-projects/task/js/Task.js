export class Task {
  constructor({ text, category, completed }, onComplete = () => {}) {
    this.text = text;
    this.category = category;
    this.completed = completed;
    this.onComplete = onComplete;
  }

  render() {
    const item = document.createElement("article");
    item.className = "task-item";

    const content = document.createElement("div");
    content.className = "task-content";

    const title = document.createElement("p");
    title.className = "task-text";
    title.textContent = this.text;

    const category = document.createElement("span");
    category.className = "task-category";
    category.textContent = this.category;
    content.append(title, category);

    const button = document.createElement("button");
    button.className = "complete-button";
    button.type = "button";
    button.addEventListener("click", () => {
      this.completed = true;
      this.updateElement(title, button);
      this.onComplete();
    });

    item.append(content, button);
    this.updateElement(title, button);
    return item;
  }

  updateElement(title, button) {
    title.classList.toggle("task-text--completed", this.completed);
    button.textContent = this.completed ? "Completed" : "Complete";
    button.disabled = this.completed;
  }
}
