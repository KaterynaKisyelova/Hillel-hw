class TodoFormView extends FormView {
  initForm() {
    return $(`
      <form>
        <input class="todo-input" />
        <button type="submit" class="todo-button">Add Todo</button>
      </form>
    `).on("submit", this.onFormSubmit.bind(this));
  }
}
