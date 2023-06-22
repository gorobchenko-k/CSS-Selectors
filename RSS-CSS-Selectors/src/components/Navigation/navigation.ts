import './navigation.css';
import { createElement, getElement } from '../../helpers';
import { levels } from '../../data/levels';
import { ContentList, LevelStatus, StyleList } from '../../types';

const NAV_STYLE: StyleList = {
  nav: ['header__nav', 'nav'],
  navTitle: ['nav__title'],
  navCurrentLevel: ['nav__current-level'],
  navButtons: ['nav__buttons'],
  navPrevButton: ['nav__prev-button', 'button'],
  navNextButton: ['nav__next-button', 'button'],
  navList: ['nav__list'],
  navItem: ['nav__item'],
  navItemStatus: ['nav__item-status'],
  navLevelNumber: ['nav__level-number'],
};

const NAV_TEXT: ContentList = {
  navTitleLevel: 'Level ',
  navTitleNumberOfLevel: ` of ${levels.length}`,
  navPrevButton: '<',
  navNextButton: '>',
  navItemStatus: '✔',
};

class Navigation {
  public navList: HTMLUListElement;

  public navCurrentLevel: HTMLSpanElement;

  public navPrevButton: HTMLButtonElement;

  public navNextButton: HTMLButtonElement;

  private navListItem: Record<string, HTMLSpanElement>[] = [];

  constructor() {
    this.navList = createElement('ul', NAV_STYLE.navList);
    this.navCurrentLevel = createElement('span', NAV_STYLE.navCurrentLevel, '1');
    this.navPrevButton = createElement('button', NAV_STYLE.navPrevButton, NAV_TEXT.navPrevButton);
    this.navNextButton = createElement('button', NAV_STYLE.navNextButton, NAV_TEXT.navNextButton);
    this.createNavigation();
  }

  private createNavigation(): void {
    const nav = createElement('nav', NAV_STYLE.nav);
    const navTitle = createElement('h2', NAV_STYLE.navTitle);
    const navButtons = createElement('div', NAV_STYLE.navButtons);

    navTitle.append(NAV_TEXT.navTitleLevel, this.navCurrentLevel, NAV_TEXT.navTitleNumberOfLevel);
    navButtons.append(this.navPrevButton, this.navNextButton);

    levels.forEach((_, index) => {
      const listItem = createElement('li', NAV_STYLE.navItem);
      const itemStatus = createElement('span', NAV_STYLE.navItemStatus, NAV_TEXT.navItemStatus);
      const itemNumber = createElement('span', NAV_STYLE.navLevelNumber, `Level ${index + 1}`);
      listItem.setAttribute('data-level', index.toString());
      listItem.append(itemStatus, itemNumber);
      this.navListItem.push({ itemStatus, itemNumber });
      this.navList.append(listItem);
    });

    nav.append(navTitle, navButtons, this.navList);
    getElement('.header__container').append(nav);
  }

  public selectCurrentLevel(currentLevel: number): void {
    this.navListItem.forEach((listItem) => listItem.itemNumber.classList.remove('checked'));
    this.navListItem[currentLevel].itemNumber.classList.add('checked');
  }

  public setStyleListItem(numberOfLevel: number, status: LevelStatus): void {
    this.navListItem[numberOfLevel].itemStatus.classList.add(LevelStatus[status]);
  }
}

export { Navigation };
