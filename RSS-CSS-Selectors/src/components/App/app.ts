import { Navigation } from '../Navigation/navigation';
import { Level } from '../Level/level';
import { getElements } from '../../helpers';
import { levels } from '../../data/levels';

class App {
  private nav = new Navigation();

  private level = new Level();

  private currentLevel: number;

  constructor() {
    this.currentLevel = 0;
    this.addLevelHandler();
    this.addNavHandler();
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
          if (this.currentLevel < levels.length - 1) {
            this.currentLevel += 1;
            this.setNumberOfCurrentLevel();
          }
        });
        element.classList.add('rightAnswer');
      });
    }
  }

  private addNavHandler(): void {
    this.nav.navPrevButton.addEventListener('click', () => {
      if (this.currentLevel > 0) {
        this.currentLevel -= 1;
        this.setNumberOfCurrentLevel();
      }
    });

    this.nav.navNextButton.addEventListener('click', () => {
      if (this.currentLevel < levels.length - 1) {
        this.currentLevel += 1;
        this.setNumberOfCurrentLevel();
      }
    });

    this.nav.navList.addEventListener('click', (e) => {
      if (!(e.target && e.target instanceof HTMLElement)) return;
      const listItem = e.target.closest('.nav__item');
      if (listItem) {
        const level = listItem.getAttribute('data-level');
        if (!level) throw new Error('Level is null');
        this.currentLevel = +level;
        this.setNumberOfCurrentLevel();
      }
    });
  }

  private setNumberOfCurrentLevel(): void {
    this.nav.navCurrentLevel.innerHTML = `${this.currentLevel + 1}`;
    this.nav.selectCurrentLevel(this.currentLevel);
    this.level.clearContent();
    this.level.setContent(this.currentLevel);
  }
}

export { App };
