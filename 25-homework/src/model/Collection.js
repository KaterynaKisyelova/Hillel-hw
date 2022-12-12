class Collection {
  #studentsList = [];

  get() {
    return StudentsApi.get().then((list) => (this.#studentsList = [...list]));
  }

  create(student) {
    return StudentsApi.create(student).then((newStudent) => {
      this.#studentsList.push(newStudent);
      return newStudent;
    });
  }

  update(id, marks) {
    return StudentsApi.update(id, marks).then((updateStudent) => {
      const student = this.find(id);

      student.marks = updateStudent.marks;

      return student;
    });
  }

  delete(id) {
    return StudentsApi.delete(id).then((res) => {
      this.#studentsList = this.#studentsList.filter(
        (student) => student.id !== res.id
      );
      return res.id;
    });
  }

  find(id) {
    return this.#studentsList.find((student) => student.id === id);
  }
}
