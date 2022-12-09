class Controller {
  #$rootEl;

  constructor($rootEl) {
    this.#$rootEl = $rootEl;
    this.collection = new Collection();
    this.formView = new StudentsFormView({
      onSubmit: (student) => this.saveStudent(student),
    });
    this.tableView = new TableView({
      onDelete: (id) => {
        this.deleteStudent(id);
      },
      onEdit: (id, marks) => {
        this.editStudent(id, marks);
      },
    });

    this.formView.addToContainer(this.#$rootEl);
    this.tableView.addToContainer(this.#$rootEl);

    this.collection.get().then((list) => {
      this.tableView.renderStudents(list);
    });
  }

  saveStudent(student) {
    this.collection
      .create(student)
      .then((newStudent) => this.tableView.renderItem(newStudent))
      .catch(this.showError);
  }

  deleteStudent(id) {
    this.collection.delete(id).then((res) => console.log(res.id));
    this.tableView.removeItem(id);
  }

  editStudent(id, marks) {
    this.collection
      .update(id, marks)
      .then((updateStudent) =>
        this.tableView.replaceItem(updateStudent.id, updateStudent)
      );
  }

  showError(error) {
    console.log(error.message);
  }
}
