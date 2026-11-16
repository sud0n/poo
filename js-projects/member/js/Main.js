import { Member } from "./Member.js";

class Main {
  constructor() {
    this.members = [];
    this.memberList = document.querySelector("#member-list");
    this.memberStatus = document.querySelector("#member-status");
    this.departmentFilter = document.querySelector("#department-filter");

    this.departmentFilter.addEventListener("change", () => {
      const selectedDepartment = this.departmentFilter.value;
      const filteredMembers = selectedDepartment === "all"
        ? this.members
        : this.members.filter((member) => member.department === selectedDepartment);
      this.render(filteredMembers);
    });
  }

  async load() {
    try {
      const response = await fetch("./data/team.json");
      if (!response.ok) {
        throw new Error(`Could not load team members (${response.status}).`);
      }

      const memberData = await response.json();
      if (!Array.isArray(memberData)) {
        throw new Error("The team data must be a JSON array.");
      }

      this.members = memberData.map((memberDataItem) => new Member(memberDataItem));
      this.populateDepartmentFilter();
      this.render();
    } catch (error) {
      console.error(error);
      this.memberStatus.textContent = "Team members could not be loaded. Please try again later.";
    }
  }

  populateDepartmentFilter() {
    const departments = [...new Set(this.members.map((member) => member.department))].sort();
    const options = departments.map((department) => {
      const option = document.createElement("option");
      option.value = department;
      option.textContent = department;
      return option;
    });
    this.departmentFilter.replaceChildren(this.departmentFilter.options[0], ...options);
  }

  render(members = this.members) {
    this.memberList.replaceChildren(...members.map((member) => member.render()));
    this.memberStatus.textContent = `${members.length} ${members.length === 1 ? "team member" : "team members"}`;
  }
}

new Main().load();
