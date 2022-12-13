class StickersFormModal {
  static INPUT_SELECTOR = "#input";
  static FORM_TAG = "form";

  #$input;

  constructor(options) {
    this.options = options;
    this.$formEl = this.init();
    this.form = this.$formEl
      .find(StickersFormModal.FORM_TAG)
      .dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
          Save: () => {
            this.form.submit();
          },
          Cancel: this.close.bind(this),
        },
        close: this.close.bind(this),
      })
      .on("submit", this.onDialogFormSubmit.bind(this));
    this.#$input = this.form.find(StickersFormModal.INPUT_SELECTOR);
  }

  init() {
    return $(`<div>
                <form id="dialogForm" title="Save Sticker">      
                  <input id="input"></input>
                </form>
              </div>`);
  }

  onDialogFormSubmit(e) {
    e.preventDefault();

    const description = this.#$input.val();

    if (!description) {
      return;
    }

    this.options.onSubmit(description);
    this.#$input.val("");
    this.close();
  }

  open() {
    this.form.dialog("open").bind(this);
  }

  close() {
    this.form.dialog("close").bind(this);
  }

  appendTo($container) {
    $container.append(this.$formEl);
  }
}
