import './resultViewer.css';
import { StyleList } from '../../../types';
import { createElement, getElement } from '../../../helpers';

const RESULT_VIEWER_STYLE: StyleList = {
  tagName: ['result-viewer__tagName'],
  board: ['result-viewer__board', 'board'],
};

class ResultViewer {
  private tagName: HTMLDivElement;

  private board: HTMLDivElement;

  constructor() {
    this.tagName = createElement('div', RESULT_VIEWER_STYLE.tagName);
    this.board = createElement('div', RESULT_VIEWER_STYLE.board);
    getElement('.result-viewer__container').append(this.tagName, this.board);
  }

  public setContent(code: string): void {
    const tags = code
      .split('\n')
      .slice(1, -1)
      .map((item) => item.trim());
    let parentNode: Element | null = null;

    tags.forEach((tag) => {
      const index = tag.indexOf('/');
      if (index === 1) {
        if (!parentNode) throw new Error('parentNode is null');
        parentNode = null;
      } else {
        const element = this.createBoardElement(tag);
        if (index === -1) {
          this.board.append(element);
          parentNode = element;
        } else {
          (parentNode || this.board).append(element);
        }
      }
    });
  }

  private createBoardElement(tag: string): Element {
    const { tagName, idName, className } = this.getSelectors(tag);
    const element = document.createElement(tagName);
    if (className) element.classList.add(className);
    if (idName) element.setAttribute('id', idName);
    element.classList.add('board__element');
    return element;
  }

  private getSelectors(tag: string): {
    tagName: string;
    idName: string | null;
    className: string | null;
  } {
    const matchTag = tag.match(/<.*?[ />]/);
    const matchClass = tag.match(/class='.*?'/);
    const matchId = tag.match(/id='.*?'/);
    if (!matchTag) throw new Error(`Tag name in ${tag} not found`);
    const tagName = matchTag[0].slice(1, -1);
    const idName = matchId ? matchId[0].slice(4, -1) : null;
    const className = matchClass ? matchClass[0].slice(7, -1) : null;
    return { tagName, idName, className };
  }
}

export { ResultViewer };
