import { Navigation } from '../Navigation/navigation';
import { Level } from '../Level/level';
import { getElements } from '../../helpers';
import { levels } from '../../data/levels';
import { LevelStatus } from '../../types';
import { Modal } from '../Modal/modal';

class App {
  private nav = new Navigation();

  private level = new Level();

  private currentLevel: number;

  private isLevelDoneWithHelp = false;

  private levelProgress: LevelStatus[] = Array(levels.length).fill(LevelStatus.isNotDone);

  constructor() {
    this.currentLevel = 0;
    this.addLevelHandler();
    this.addNavHandler();
    this.addAppHandler();
  }

  public start(): void {
    this.getDataFromLocalStorage();
    this.levelProgress.forEach((status, level) => {
      this.nav.setStyleListItem(level, status);
    });
    this.setNumberOfCurrentLevel(this.currentLevel);
  }

  private addLevelHandler(): void {
    this.level.codeEditor.buttonEnter.addEventListener('click', () => this.checkAnswer());
    this.level.codeEditor.inputAnswer.addEventListener('keydown', (e: KeyboardEvent) => {
      this.level.codeEditor.inputAnswer.classList.remove('wrong-answer');
      if (e.code === 'Enter') {
        this.checkAnswer.call(this);
      }
    });
    this.level.codeEditor.buttonHelp.addEventListener('click', () => {
      this.isLevelDoneWithHelp = true;
      this.showAnswer(0);
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
      this.levelProgress[this.currentLevel] = this.isLevelDoneWithHelp
        ? LevelStatus.isDoneWithHelp
        : LevelStatus.isDone;
      this.isLevelDoneWithHelp = false;
      this.nav.setStyleListItem(this.currentLevel, this.levelProgress[this.currentLevel]);
      this.level.answerElements[0].addEventListener('transitionend', () => this.setNextLevel());
      this.level.answerElements.forEach((element) => {
        element.classList.add('rightAnswer');
      });
    }
  }

  private setNextLevel(): void {
    if (this.levelProgress.every((level) => level !== LevelStatus.isNotDone)) {
      const modal = new Modal();
      modal.buildModal('Congratulations! You have passed all the levels!');
      this.level.clearContent();
    } else {
      const numberOfNextLevel = this.levelProgress.indexOf(LevelStatus.isNotDone);
      this.setNumberOfCurrentLevel(numberOfNextLevel);
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

    this.nav.navResetButton.addEventListener('click', () => this.resetProgress());
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
    localStorage.setItem('levelProgress', JSON.stringify(this.levelProgress));
  }

  private getDataFromLocalStorage(): void {
    const numberOfLevel = localStorage.getItem('currentLevel');
    const levelProgress = localStorage.getItem('levelProgress');
    if (numberOfLevel) this.currentLevel = +numberOfLevel;
    if (levelProgress) this.levelProgress = JSON.parse(levelProgress);
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

  private resetProgress(): void {
    this.levelProgress = Array(levels.length).fill(LevelStatus.isNotDone);
    this.levelProgress.forEach((status, level) => {
      this.nav.setStyleListItem(level, status);
    });
  }
}

export { App };
