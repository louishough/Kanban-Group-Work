import app, { Component } from 'apprun';

type Project = {
  id: string,
  title: string,
  ownerid: number
}

export default class Projects extends Component {
  state = 'Projects Page'

  view = (state) => <div>{state}</div>

  update = {
    '#projects': state=>state, // <-- THIS!! 
  }
  
}
