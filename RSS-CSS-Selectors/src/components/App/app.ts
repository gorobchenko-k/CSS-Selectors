import { Navigation } from '../Navigation/navigation';
import { Level } from '../Level/level';

class App {
  private nav = new Navigation();

  private level = new Level();

  private currentLevel: number;

  constructor() {
    this.currentLevel = 0;
  }

  public start(): void {
    this.nav.selectCurrentLevel(this.currentLevel);
    this.level.setContent(this.currentLevel);
  }
}

export { App };
