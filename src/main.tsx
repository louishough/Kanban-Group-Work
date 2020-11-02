import app from 'apprun';
import TaskComponent from './tasks';

const state = 'Kanban';

const view = (state) => <div>
 <TaskComponent />
</div>;

const update = {

};

app.start("project", state, view, update);