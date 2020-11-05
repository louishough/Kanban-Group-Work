import app, { Component } from 'apprun';

export default class Projects extends Component {

const state = 'Projects Page';

const view = (state) => <div>

{state}  
  
</div>;

const update = {

  
};

app.start(document.body, state, view, update);

}