import app, { Component } from 'apprun';

export default class LoginComponent extends Component
{
    state = 'test is working';

    view = (state) => <div>
    <form>
      <h3>Login</h3>
      <div class="login">
        <input name="username" placeholder="username" required/>
        <button>Login</button>
      </div>
      <div class="create">
          <h4>Create Account &nbsp;<a><i class="fas fa-plus-circle"></i></a></h4>
      </div>
    </form>
    </div>;
}


