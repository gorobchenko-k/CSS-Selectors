import './codeViewer.css';
import { ContentList, StyleList } from '../../../types';
import { createElement, getElement } from '../../../helpers';

const CODE_VIEWER_STYLE: StyleList = {
  taskCode: ['html-viewer__task-code'],
};

const HTML_VIEWER_TEXT: ContentList = {
  openedTag: '<div class="board">',
  closedTag: '</div>',
};

class CodeViewer {
  private taskCode: HTMLDivElement;

  constructor() {
    this.taskCode = createElement('div', CODE_VIEWER_STYLE.taskCode);
    getElement('.html-viewer__code').append(
      HTML_VIEWER_TEXT.openedTag,
      this.taskCode,
      HTML_VIEWER_TEXT.closedTag
    );
  }
}

export { CodeViewer };
