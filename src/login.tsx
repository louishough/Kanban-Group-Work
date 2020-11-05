import app, { Component } from 'apprun';

export default class Login extends Component {


const state = 'Login Page';

const view = (state) => <div>
  
{state}
  
</div>;

const update = {

  
};

app.start(document.body, state, view, update);
    
}