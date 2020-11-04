import app from 'apprun';
import TaskComponent from './tasks';
import Test from './test';

const state = 'Hello world - AppRun !';

const view = (state) => <div>
  <TaskComponent />
</div>;

const update = {

};

app.start(document.body, state, view, update);
