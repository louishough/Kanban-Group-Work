import app, { Component } from 'apprun';

type User = {
    id: string;
    name: string;
    avatarURL?: string;
    loggedIn: boolean;
  }

const USER_KEY: string = 'users'

export default class Login extends Component {


state = {
    users: [],
    type: 'Users',
    userkey: `${USER_KEY}`
}
view = (state) => 
<div>


    {/* login form */}
    <div class="container mx-auto h-full flex justify-center items-center" id="login">
    <div class="w-full max-w-xs">
        <form onsubmit={(event) => this.run('login-user', event)} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name='username' type="text" placeholder="Username" />
            </div>

            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign In
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Create an account
                </a>
            </div>
        </form>
    </div>
    </div>


    {/* signup form */}
    <div class="container mx-auto h-full flex justify-center items-center" id="signup">
    <div class="w-full max-w-xs">
    <form onsubmit={(event)=>this.run('add-user', event)} class="w-full max-w-lg">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Username
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" name='username' type="text" placeholder="JohnSmith" />
                <p class="text-gray-700 text-xs italic">Must be unique!</p>
            </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Avatar Url
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" name='avatar-url' type="url" placeholder="http://example.com/img.jpeg" />
                <p class="text-gray-700 text-xs italic">.png, .jpeg, etc</p>
            </div>
        </div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Continue</button>
    </div>

    </form>
    </div>
    </div>
</div>;


update = {

    'add-user': (state, event)=>{
        event.preventDefault();
        const userForm = new FormData(event.target);
        const user:User = {
            id: guidGenerator(),
            name: userForm.get('username').toString(),
            avatarURL: userForm.get('avatar-url').toString().length>0 ? userForm.get('avatar-url').toString() : null,
            loggedIn: true,
        }
        console.log(user);

        return {...state, users: [...state.users.map(user=>({...user, loggedIn: false}) ), user]}
    },

    'login-user': (state, event) =>{
      event.preventDefault();
      const loginForm = new FormData(event.target);
      const name = loginForm.get('username').toString();
      
      if(!state.users.some(user=>user.name===name)){
          alert(`User ${name} not found.`);
          return state;
      }
      return {...state, ...state.users.map(user => user.name===name ? {...user, loggedIn:true} : {...user, loggedIn: false})}
    },


    '#login': state=>state, // <-- THIS!! 
  
};


constructor(props) {
    super()
    const userKey:string = `${USER_KEY}`
    const stored:string = localStorage.getItem(userKey)
    this.state = stored ? JSON.parse(stored) : {...this.state, ...props, userKey}
}
rendered = (state) => localStorage.setItem(this.state.userkey, JSON.stringify(state))
    
}


const guidGenerator = () =>{
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
