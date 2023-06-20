import './level.css';
import { levels } from '../../data/levels';
import { createElement, getElement, getElements } from '../../helpers';
import { CodeEditor } from '../Editor/codeEditor';
import { CodeViewer } from '../Viewer/codeViewer/codeViewer';
import { ResultViewer } from '../Viewer/resultViewer/resultViewer';

class Level {
  private codeEditor = new CodeEditor();

  private codeViewer = new CodeViewer();

  private resultViewer = new ResultViewer();

  private taskTitle: HTMLHeadingElement;

  private answerElements: Element[] = [];

  constructor() {
    this.taskTitle = createElement('h2', ['level__task']);
    getElement('.level').prepend(this.taskTitle);
  }

  public setContent(numberOfLevel: number): void {
    const levelData = levels[numberOfLevel];
    this.taskTitle.innerHTML = levelData.task;
    this.codeViewer.setContent(levelData.boardMarkup);
    this.resultViewer.setContent(levelData.boardMarkup);

    this.answerElements = Array.from(getElements(levelData.selector, this.resultViewer.board));
    this.answerElements.forEach((element) => this.startAnimationForAnswerElement(element));
  }

  private startAnimationForAnswerElement(element: Element): void {
    setTimeout(() => {
      element.classList.toggle('skew');
      this.startAnimationForAnswerElement(element);
    }, 500);
  }
}

export { Level };
