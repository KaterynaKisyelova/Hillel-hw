class Collection {
  #todoList = [];

  get() {
    return TodosApi.get().then((list) => (this.#todoList = [...list]));
  }

  create(todo) {
    return TodosApi.create(todo).then((newTodo) => {
      this.#todoList.push(newTodo);
      return newTodo;
    });
  }

  update(id, changes) {
    return TodosApi.update(id, changes).then((updatedTodo) => {
      const todo = this.find(updatedTodo.id);

      Object.keys(updatedTodo).forEach((key) => (todo[key] = updatedTodo[key]));

      return todo;
    });
  }

  delete(id) {
    return TodosApi.delete(id).then(
      (res) =>
        (this.#todoList = this.#todoList.filter((todo) => todo.id !== res.id))
    );
  }

  find(id) {
    return this.#todoList.find((todo) => todo.id === id);
  }
}
