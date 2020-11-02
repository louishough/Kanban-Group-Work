import app from 'apprun';
import Test from './test';
import Login from './login';

const state = 'Kanban';

const view = (state) => <div>
  <h1>{state}</h1>
  <Login />
</div>;

const update = {

};


app.start(document.body, state, view, update);
