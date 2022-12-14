import FormView from "./FormView";
import formHtml from "./StudentsFormView.html";
import $ from "jquery";

import './StudentsFormView.css';

export default class StudentsFormView extends FormView {
  initForm() {
    return $(formHtml).on("submit", this.onFormSubmit.bind(this));
  }
}
