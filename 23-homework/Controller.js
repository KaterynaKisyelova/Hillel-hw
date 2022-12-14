class Controller {
  #$rootEl;

  constructor($rootEl) {
    this.#$rootEl = $rootEl;
    this.collection = new Collection();
    this.todoFormView = new TodoFormView({
      onSubmit: (todo) => this.saveTodo(todo),
    });
    this.todoListView = new TodoListView({
      onDelete: (id) => {
        this.deleteTodo(id);
      },
      onEdit: (id) => {
        this.editTodo(id);
      },
      onComplete: (id, complete) => {
        this.switchCompleteness(id, complete);
      },
    });

    this.todoFormView.addToContainer(this.#$rootEl);
    this.todoListView.addToContainer(this.#$rootEl);

    this.collection.get().then((list) => {
      this.todoListView.renderTodos(list);
    });
  }

  saveTodo(todo) {
    if (todo.id) {
      this.collection
        .update(todo.id, todo)
        .then((res) => this.todoListView.replaceItem(res.id, res))
        .catch(this.showError);
      return;
    }

    this.collection
      .create(todo)
      .then((newTodo) => this.todoListView.renderItem(newTodo))
      .catch(this.showError);
  }

  deleteTodo(id) {
    this.collection.delete(id);
    this.todoListView.removeItem(id);
  }

  editTodo(id) {
    const todo = this.collection.find(id);
    this.todoFormView.makeTodoEditable(todo);
  }

  showError(error) {
    console.log(error.message);
  }

  switchCompleteness(id, changes) {
    this.collection.update(id, changes);
  }
}
