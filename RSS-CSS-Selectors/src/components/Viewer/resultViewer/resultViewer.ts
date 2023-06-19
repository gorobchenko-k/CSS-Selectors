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
}

export { ResultViewer };
