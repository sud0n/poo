export class Member {
  constructor({ name, position, department, availability }) {
    this.name = name;
    this.position = position;
    this.department = department;
    this.availability = availability;
  }

  render() {
    const card = document.createElement("article");
    card.className = "member-card";

    const avatar = document.createElement("div");
    avatar.className = "member-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = this.getInitials();

    const details = document.createElement("div");
    details.className = "member-details";

    const name = document.createElement("h2");
    name.textContent = this.name;

    const position = document.createElement("p");
    position.className = "member-position";
    position.textContent = this.position;

    const department = document.createElement("span");
    department.className = "member-department";
    department.textContent = this.department;

    const availability = document.createElement("span");
    availability.className = `availability${this.availability ? " availability--available" : ""}`;
    availability.textContent = this.availability ? "Available" : "Unavailable";

    details.append(name, position, department);
    card.append(avatar, details, availability);
    return card;
  }

  getInitials() {
    return this.name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
}