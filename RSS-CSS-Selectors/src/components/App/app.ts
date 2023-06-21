import { Navigation } from '../Navigation/navigation';
import { Level } from '../Level/level';
import { getElements } from '../../helpers';

class App {
  private nav = new Navigation();

  private level = new Level();

  private currentLevel: number;

  constructor() {
    this.currentLevel = 0;
    this.addLevelHandler();
  }

  public start(): void {
    this.nav.selectCurrentLevel(this.currentLevel);
    this.level.setContent(this.currentLevel);
  }

  private addLevelHandler(): void {
    this.level.codeEditor.button.addEventListener('click', this.checkAnswer.bind(this));
    this.level.codeEditor.inputAnswer.addEventListener('keydown', (e: KeyboardEvent) => {
      this.level.codeEditor.inputAnswer.classList.remove('wrong-answer');
      if (e.code === 'Enter') {
        this.checkAnswer.call(this);
      }
    });
  }

  private checkAnswer(): void {
    const inputAnswer = Array.from(
      getElements(this.level.codeEditor.inputAnswer.value, this.level.resultViewer.board)
    );

    const isRightAnswer =
      this.level.answerElements.length === inputAnswer.length &&
      this.level.answerElements.every((value, index) => value === inputAnswer[index]);

    if (!isRightAnswer) {
      this.level.codeEditor.inputAnswer.classList.add('wrong-answer');
    } else {
      this.level.answerElements.forEach((element) => {
        this.level.answerElements[0].addEventListener('transitionend', () => {
          // nextLevel
        });
        element.classList.add('rightAnswer');
      });
    }
  }
}

export { App };
