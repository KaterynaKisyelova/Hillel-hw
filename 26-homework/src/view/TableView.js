import tableHtml from "./TableView.html";
import $ from "jquery";

import "./TableView.css";

export default class TableView {
  static DELETE_BTN_SELECTOR = ".delete";
  static STUDENT_ROW_SELECTOR = ".table__row";
  static TABLE_BODY_SELECTOR = ".table__body";
  static MARK_SELECTOR = ".mark";
  static INITIAL_MARK = "0";

  constructor(options) {
    this.options = options;
    this.$table = this.init();
    this.$container = this.$table.find(TableView.TABLE_BODY_SELECTOR);
  }

  init() {
    return $(tableHtml)
      .on(
        "click",
        TableView.DELETE_BTN_SELECTOR,
        this.onDeleteBtnClick.bind(this)
      )
      .on("focusout", this.onInputFocusout.bind(this));
  }

  onDeleteBtnClick(e) {
    const id = this.getStudentId(e.target);

    this.options.onDelete(id);
  }

  onInputFocusout(e) {
    if (!this.isInputValid(e.target.value)) {
      e.target.value = TableView.INITIAL_MARK;
      return;
    }

    const student = this.getStudent(e.target);
    const marks = this.getStudentMarks(student);
    const id = student.dataset.id;

    this.options.onEdit(id, { marks });
  }

  isInputValid(value) {
    return value.trim() && !isNaN(Number(value));
  }

  getStudent(target) {
    return target.closest(TableView.STUDENT_ROW_SELECTOR);
  }

  getStudentId(target) {
    return this.getStudent(target).dataset.id;
  }

  getStudentMarks(student) {
    const [...marksInputs] = student.querySelectorAll(TableView.MARK_SELECTOR);

    return marksInputs.map((input) => input.value);
  }

  renderItem(student) {
    const studentItem = this.generateItem(student);
    this.$container.append(studentItem);
  }

  removeItem(id) {
    const $student = this.$container.find(`[data-id=${id}]`);
    $student.remove();
  }

  replaceItem(id, student) {
    const $oldStudent = this.$container.find(`[data-id=${id}]`);
    const newStudent = this.generateItem(student);
    $oldStudent.replaceWith(newStudent);
  }

  renderStudents(students) {
    this.$container.html(students.map(this.generateItem));
  }

  generateItem(student) {
    return `<tr class="table__row" data-id=${student.id}>
              <td class="name">${student.name}</td>
              <td class="marks">${student.marks
                .map((mark) => `<input class="mark" value=${mark}>`)
                .join("")}</td>
              <td class="actions"><button class="btn delete">Delete</button></td>
            </tr>`;
  }

  addToContainer($root) {
    $root.prepend(this.$table);
  }
}
