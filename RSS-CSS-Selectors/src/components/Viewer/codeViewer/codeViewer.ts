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

  public setContent(code: string): void {
    const tags = code
      .split('\n')
      .slice(1, -1)
      .map((item) => item.trim());
    let parentNode: HTMLElement | null = null;
    tags.forEach((tag) => {
      if (tag.indexOf('/') === 1) {
        if (!parentNode) throw new Error('parentNode is null');
        parentNode.append(tag);
        parentNode = null;
      } else {
        const element = createElement('div', ['tag'], tag);
        if (tag.indexOf('/') >= 0) {
          (parentNode || this.taskCode).append(element);
        } else {
          this.taskCode.append(element);
          parentNode = element;
        }
      }
    });
  }
}

export { CodeViewer };
