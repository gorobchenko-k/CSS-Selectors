import './codeEditor.css';
import { createElement, getElement } from '../../helpers';
import { StyleList } from '../../types';

const CSS_EDITOR_STYLE: StyleList = {
  inputAnswer: ['code-editor__input-answer'],
  button: ['code-editor__button', 'button'],
};

class CodeEditor {
  public inputAnswer: HTMLInputElement;

  public button: HTMLButtonElement;

  constructor() {
    this.button = createElement('button', CSS_EDITOR_STYLE.button, 'Enter');
    this.inputAnswer = createElement('input', CSS_EDITOR_STYLE.inputAnswer);
    this.inputAnswer.type = 'text';

    getElement('.code-editor__code').prepend(this.inputAnswer, this.button);
  }

  public clearContent(): void {
    this.inputAnswer.value = '';
  }
}

export { CodeEditor };
