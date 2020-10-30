import app from 'apprun';
import Test from './test';

const state = 'Hello world - AppRun !';

const view = (state) => <div>
  <h1>{state}</h1>
  <Test />
</div>;

const update = {

};

app.start(document.body, state, view, update);
