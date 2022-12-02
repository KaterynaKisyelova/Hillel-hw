class FormView {
  static INPUT_CLASS_NAME = ".todo-input";

  #$formInput;
  #editedTodo;

  constructor(options) {
    this.options = options;
    this.$todoForm = this.initForm();
    this.#$formInput = this.$todoForm.find(TodoFormView.INPUT_CLASS_NAME);
  }

  initForm() {
    throw new Error("This method must be implemented in a child class.");
  }

  addToContainer($rootTodo) {
    $rootTodo.append(this.$todoForm);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const inputValue = this.#$formInput.val();

    if (!inputValue.trim()) {
      return;
    }

    if (this.#editedTodo) {
      const todo = { ...this.#editedTodo, title: inputValue };

      this.options.onSubmit(todo);
      this.clearInput();

      this.#editedTodo = null;

      return;
    }

    const todo = { title: inputValue, done: false };
    this.options.onSubmit(todo);
    this.clearInput();
  }

  makeTodoEditable(todo) {
    this.#editedTodo = todo;
    this.#$formInput.val(this.#editedTodo.title);
  }

  clearInput() {
    this.#$formInput.val("");
  }
}
