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
    this.addAppHandler();
  }

  public start(): void {
    const numberOfLevel = localStorage.getItem('currentLevel') || this.currentLevel;
    this.setNumberOfCurrentLevel(+numberOfLevel);
  }

  private addLevelHandler(): void {
    this.level.codeEditor.buttonEnter.addEventListener('click', this.checkAnswer.bind(this));
    this.level.codeEditor.inputAnswer.addEventListener('keydown', (e: KeyboardEvent) => {
      this.level.codeEditor.inputAnswer.classList.remove('wrong-answer');
      if (e.code === 'Enter') {
        this.checkAnswer.call(this);
      }
    });
    this.level.codeEditor.buttonHelp.addEventListener('click', this.showAnswer.bind(this, 0));
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
            this.setNumberOfCurrentLevel(this.currentLevel + 1);
          }
        });
        element.classList.add('rightAnswer');
      });
    }
  }

  private addNavHandler(): void {
    this.nav.navPrevButton.addEventListener('click', () => {
      if (this.currentLevel > 0) {
        this.setNumberOfCurrentLevel(this.currentLevel - 1);
      }
    });

    this.nav.navNextButton.addEventListener('click', () => {
      if (this.currentLevel < levels.length - 1) {
        this.setNumberOfCurrentLevel(this.currentLevel + 1);
      }
    });

    this.nav.navList.addEventListener('click', (e) => {
      if (!(e.target && e.target instanceof HTMLElement)) return;
      const listItem = e.target.closest('.nav__item');
      if (listItem) {
        const level = listItem.getAttribute('data-level');
        if (!level) throw new Error('Level is null');
        this.setNumberOfCurrentLevel(+level);
      }
    });
  }

  private setNumberOfCurrentLevel(numberOfLevel: number): void {
    this.currentLevel = numberOfLevel;
    this.nav.navCurrentLevel.innerHTML = `${this.currentLevel + 1}`;
    this.nav.selectCurrentLevel(this.currentLevel);
    this.level.clearContent();
    this.level.setContent(this.currentLevel);
  }

  private addAppHandler(): void {
    window.addEventListener('beforeunload', () => this.setDataToLocalStorage());
  }

  private setDataToLocalStorage(): void {
    localStorage.setItem('currentLevel', this.currentLevel.toString());
  }

  private showAnswer(numberOfSymbol: number): void {
    this.level.codeEditor.inputAnswer.value = levels[this.currentLevel].selector.slice(
      0,
      numberOfSymbol
    );
    if (levels[this.currentLevel].selector.length !== numberOfSymbol) {
      setTimeout(this.showAnswer.bind(this, numberOfSymbol + 1), 300);
    }
  }
}

export { App };
