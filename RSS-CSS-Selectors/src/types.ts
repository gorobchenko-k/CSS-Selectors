type LevelData = {
  task: string;
  boardMarkup: string;
  selector: string;
};

type StyleList = Record<string, string[]>;

type ContentList = Record<string, string>;

enum LevelStatus {
  'isNotDone',
  'isDoneWithHelp',
  'isDone',
}

export { LevelData, StyleList, ContentList, LevelStatus };
