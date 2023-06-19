import { CodeEditor } from '../Editor/codeEditor';
import { CodeViewer } from '../Viewer/codeViewer/codeViewer';
import { ResultViewer } from '../Viewer/resultViewer/resultViewer';

class Level {
  private codeEditor = new CodeEditor();

  private codeViewer = new CodeViewer();

  private resultViewer = new ResultViewer();
}

export { Level };
