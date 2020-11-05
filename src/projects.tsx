import app, { Component } from 'apprun';

export default class Projects extends Component {
  state = 'Projects Page'
  view = (state) => <div>
    {state}  
  </div>

  update = {
    '#projects': state=>state, // <-- THIS!! 
  }
  
}

