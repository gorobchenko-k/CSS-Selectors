import './level.css';
import { levels } from '../../data/levels';
import { createElement, getElement, getElements } from '../../helpers';
import { CodeEditor } from '../Editor/codeEditor';
import { CodeViewer } from '../Viewer/codeViewer/codeViewer';
import { ResultViewer } from '../Viewer/resultViewer/resultViewer';

class Level {
  public codeEditor = new CodeEditor();

  private codeViewer = new CodeViewer();

  public resultViewer = new ResultViewer();

  private taskTitle: HTMLHeadingElement;

  public answerElements: Element[] = [];

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

    this.resultViewer.boardElements.forEach((element, index) => {
      this.addHoverEffect(element, this.codeViewer.codeElements[index]);
    });
  }

  private startAnimationForAnswerElement(element: Element): void {
    setTimeout(() => {
      element.classList.toggle('skew');
      this.startAnimationForAnswerElement(element);
    }, 500);
  }

  private addHoverEffect(boardElement: HTMLElement, codeElement: HTMLDivElement): void {
    boardElement.addEventListener('mouseover', (e) => {
      this.toggelHoverEffect(e, boardElement, codeElement);
    });
    boardElement.addEventListener('mouseout', (e) => {
      this.toggelHoverEffect(e, boardElement, codeElement);
    });
    codeElement.addEventListener('mouseover', (e) => {
      this.toggelHoverEffect(e, boardElement, codeElement);
    });
    codeElement.addEventListener('mouseout', (e) => {
      this.toggelHoverEffect(e, boardElement, codeElement);
    });
  }

  private toggelHoverEffect(
    e: Event,
    boardElement: HTMLElement,
    codeElement: HTMLDivElement
  ): void {
    e.stopPropagation();
    this.resultViewer.visibleTagName(
      boardElement.offsetLeft,
      codeElement.firstChild?.textContent || '',
      codeElement.lastChild?.textContent || ''
    );
    boardElement.classList.toggle('hover');
    codeElement.classList.toggle('hover');
  }
}

export { Level };
