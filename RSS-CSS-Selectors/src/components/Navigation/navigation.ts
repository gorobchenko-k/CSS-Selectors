import './navigation.css';
import { createElement, getElement } from '../../helpers';
import { levels } from '../../data/levels';
import { ContentList, LevelStatus, StyleList } from '../../types';

const NAV_STYLE: StyleList = {
  nav: ['header__nav', 'nav'],
  title: ['nav__title'],
  currentLevel: ['nav__current-level'],
  buttons: ['nav__buttons'],
  prevButton: ['nav__prev-button', 'button'],
  nextButton: ['nav__next-button', 'button'],
  list: ['nav__list'],
  item: ['nav__item'],
  itemStatus: ['nav__item-status'],
  levelNumber: ['nav__level-number'],
  resetButton: ['nav__reset-button', 'button'],
};

const NAV_TEXT: ContentList = {
  titleLevel: 'Level ',
  titleNumberOfLevel: ` of ${levels.length}`,
  prevButton: '<',
  nextButton: '>',
  itemStatus: '✔',
  resetButton: 'Reset progress',
};

class Navigation {
  private listItems: Record<string, HTMLSpanElement>[] = [];

  public navList = createElement('ul', NAV_STYLE.list);

  public currentLevel = createElement('span', NAV_STYLE.currentLevel, '1');

  public prevButton = createElement('button', NAV_STYLE.prevButton, NAV_TEXT.prevButton);

  public nextButton = createElement('button', NAV_STYLE.nextButton, NAV_TEXT.nextButton);

  public resetButton = createElement('button', NAV_STYLE.resetButton, NAV_TEXT.resetButton);

  constructor() {
    this.createNavigation();
  }

  private createNavigation(): void {
    const nav = createElement('nav', NAV_STYLE.nav);
    const navTitle = createElement('h2', NAV_STYLE.title);
    const navButtons = createElement('div', NAV_STYLE.buttons);

    navTitle.append(NAV_TEXT.titleLevel, this.currentLevel, NAV_TEXT.titleNumberOfLevel);
    navButtons.append(this.prevButton, this.nextButton);

    levels.forEach((_, index) => {
      const listItem = createElement('li', NAV_STYLE.item);
      const itemStatus = createElement('span', NAV_STYLE.itemStatus, NAV_TEXT.itemStatus);
      const itemNumber = createElement('span', NAV_STYLE.levelNumber, `Level ${index + 1}`);
      listItem.setAttribute('data-level', index.toString());
      listItem.append(itemStatus, itemNumber);
      this.listItems.push({ itemStatus, itemNumber });
      this.navList.append(listItem);
    });

    nav.append(navTitle, navButtons, this.navList, this.resetButton);
    getElement('.header__container').append(nav);
  }

  public selectCurrentLevel(currentLevel: number): void {
    this.listItems.forEach((listItem) => listItem.itemNumber.classList.remove('checked'));
    this.listItems[currentLevel].itemNumber.classList.add('checked');
  }

  public setStyleListItem(numberOfLevel: number, status: LevelStatus): void {
    this.listItems[numberOfLevel].itemStatus.className = '';
    this.listItems[numberOfLevel].itemStatus.classList.add(...NAV_STYLE.itemStatus);
    this.listItems[numberOfLevel].itemStatus.classList.add(LevelStatus[status]);
  }
}

export { Navigation };
