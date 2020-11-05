import app, { Component } from 'apprun';

export default class Login extends Component {


state = 'Login Page';

view = (state) => <div>
  
{state}
  
</div>;

update = {

    '#login': state=>state, // <-- THIS!! 
  
};
    
}