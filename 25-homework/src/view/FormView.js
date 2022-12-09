class FormView {
  static INPUT_SELECTOR = ".name-input";
  static INITIAL_MARKS = new Array(10).fill("0");

  #$formInput;

  constructor(options) {
    this.options = options;
    this.$studentsForm = this.initForm();
    this.#$formInput = this.$studentsForm.find(FormView.INPUT_SELECTOR);
  }

  initForm() {
    throw new Error("This method must be implemented in a child class.");
  }

  addToContainer($root) {
    $root.append(this.$studentsForm);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const inputValue = this.#$formInput.val();

    if (!inputValue.trim()) {
      return;
    }

    const student = { name: inputValue, marks: FormView.INITIAL_MARKS };
    this.options.onSubmit(student);
    this.clearInput();
  }

  clearInput() {
    this.#$formInput.val("");
  }
}
