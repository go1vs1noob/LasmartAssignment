import Workspace from './components/Managers/Workspace';
import PointManager from './components/Managers/PointManager';
import PointTable from './components/UI/PointTable';
import CommentManager from './components/Managers/CommentManager';
import PointForm from './components/UI/PointForm';
import CommentForm from './components/UI/CommentForm';
import CommentTable from './components/UI/CommentTable';
import { STAGE_HEIGHT, STAGE_WIDTH } from '../config/config';

$(() => {
  const pointManager = new PointManager();
  const commentManager = new CommentManager();
  new PointTable(pointManager, '#app #pointTable');
  new CommentTable(commentManager, pointManager, '#app #commentTable');
  new PointForm(pointManager, '#app #pointForm');
  new CommentForm(commentManager, pointManager, '#app #commentForm');
  new Workspace(STAGE_WIDTH, STAGE_HEIGHT, pointManager, commentManager, '#app #workspace');
});
