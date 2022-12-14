class TodoListView {
  static COMPLETE_TODO_CLASS_NAME = "complete";
  static DELETE_BTN_SELECTOR = ".delete";
  static TODO_ITEM_SELECTOR = ".todo-item";
  static EDIT_BTN_SELECTOR = ".edit";

  #$todosList;

  constructor(options) {
    this.options = options;
    this.#$todosList = this.initList();
  }

  initList() {
    return $(`<ul class="todo-list"></ul>`)
      .on(
        "click",
        TodoListView.DELETE_BTN_SELECTOR,
        this.onDeleteBtnClick.bind(this)
      )
      .on(
        "click",
        TodoListView.EDIT_BTN_SELECTOR,
        this.onEditBtnClick.bind(this)
      )
      .on(
        "click",
        TodoListView.TODO_ITEM_SELECTOR,
        this.onTodoItemClick.bind(this)
      );
  }

  onDeleteBtnClick(e) {
    e.stopPropagation();
    const id = this.getTodoId(e.target);

    this.options.onDelete(id);
  }

  onEditBtnClick(e) {
    e.stopPropagation();
    const id = this.getTodoId(e.target);

    this.options.onEdit(id);
  }

  onTodoItemClick(e) {
    const todo = this.getTodo(e.target);
    const id = todo.dataset.id;
    const done = this.toggleCompleteness(todo);

    this.options.onComplete(id, { done });
  }

  getTodo(target) {
    return target.closest(TodoListView.TODO_ITEM_SELECTOR);
  }

  getTodoId(target) {
    return this.getTodo(target).dataset.id;
  }

  addToContainer($rootTodo) {
    $rootTodo.append(this.#$todosList);
  }

  renderItem(todo) {
    const todoItem = this.generateItem(todo);
    this.#$todosList.append(todoItem);
  }

  removeItem(id) {
    const $todo = this.#$todosList.find(`[data-id=${id}]`);
    $todo.remove();
  }

  replaceItem(id, todo) {
    const $oldTodo = this.#$todosList.find(`[data-id=${id}]`);
    const newTodo = this.generateItem(todo);

    $oldTodo.replaceWith(newTodo);
  }

  renderTodos(todos) {
    this.#$todosList.html(todos.map(this.generateItem));
  }

  generateItem(todo) {
    return `<li class="todo-item ${
      todo.done ? TodoListView.COMPLETE_TODO_CLASS_NAME : null
    }" data-id=${todo.id}>
              <span>${todo.title}</span>
              <div>
                <button class="button edit">Edit</button>
                <button class="button delete">Delete</button>
              </div>
            </li>`;
  }

  toggleCompleteness(todo) {
    return todo.classList.toggle(TodoListView.COMPLETE_TODO_CLASS_NAME);
  }

  isCompletedTodo(item) {
    return item.classList.contains(COMPLETE_TODO_CLASS_NAME);
  }
}
