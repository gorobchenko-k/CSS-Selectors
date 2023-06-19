import { levels } from '../../data/levels';
import { createElement, getElement } from '../../helpers';
import { CodeEditor } from '../Editor/codeEditor';
import { CodeViewer } from '../Viewer/codeViewer/codeViewer';
import { ResultViewer } from '../Viewer/resultViewer/resultViewer';

class Level {
  private codeEditor = new CodeEditor();

  private codeViewer = new CodeViewer();

  private resultViewer = new ResultViewer();

  private taskTitle: HTMLHeadingElement;

  constructor() {
    this.taskTitle = createElement('h2', ['level__task']);
    getElement('.level').prepend(this.taskTitle);
  }

  public setContent(numberOfLevel: number): void {
    const levelData = levels[numberOfLevel];
    this.taskTitle.innerHTML = levelData.task;
  }
}

export { Level };
