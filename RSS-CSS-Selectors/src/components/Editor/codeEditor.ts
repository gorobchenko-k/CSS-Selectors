import './codeEditor.css';
import { createElement, getElement } from '../../helpers';
import { ContentList, StyleList } from '../../types';

const CSS_EDITOR_STYLE: StyleList = {
  inputAnswer: ['code-editor__input-answer'],
  button: ['code-editor__button', 'button'],
};

const CSS_EDITOR_CONTENT: ContentList = {
  buttonEnter: 'Enter',
  buttonHelp: 'Help',
};

class CodeEditor {
  public inputAnswer: HTMLInputElement;

  public buttonEnter: HTMLButtonElement;

  public buttonHelp: HTMLButtonElement;

  constructor() {
    this.buttonEnter = createElement(
      'button',
      CSS_EDITOR_STYLE.button,
      CSS_EDITOR_CONTENT.buttonEnter
    );
    this.buttonHelp = createElement(
      'button',
      CSS_EDITOR_STYLE.button,
      CSS_EDITOR_CONTENT.buttonHelp
    );
    this.inputAnswer = createElement('input', CSS_EDITOR_STYLE.inputAnswer);
    this.inputAnswer.type = 'text';

    getElement('.code-editor__code').prepend(this.inputAnswer, this.buttonEnter, this.buttonHelp);
  }

  public clearContent(): void {
    this.inputAnswer.value = '';
  }
}

export { CodeEditor };
