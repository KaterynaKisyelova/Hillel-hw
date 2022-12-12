class StudentsFormView extends FormView {
  initForm() {
    return $(`
        <form>
          <input class="name-input" />
          <button type="submit" class="btn save-button">Save</button>
        </form>
      `).on("submit", this.onFormSubmit.bind(this));
  }
}
