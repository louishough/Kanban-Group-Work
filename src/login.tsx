import app, { Component } from 'apprun';

type User = {
    id: number;
    name: string;
    avatarURL: string;
    loggedIn: boolean;
  }

const USER_KEY: string = 'user-'

export default class Login extends Component {


state = {
    users: [],
    type: 'Users',
    userkey: `${USER_KEY}`
}
view = (state) => 
<div>
    {state.type}
    <div class="container mx-auto h-full flex justify-center items-center">
    <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            </div>

            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign In
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Create a user?
                </a>
            </div>
        </form>
    </div>
    </div>
</div>;
    



update = {

    '#login': state=>state, // <-- THIS!! 
  
};


constructor(props) {
    super()
    const userKey:string = `${USER_KEY}${props['-userid']}`
    const stored:string = localStorage.getItem(userKey)
    this.state = stored ? JSON.parse(stored) : {...this.state, ...props, userKey}
}
rendered = (state) => localStorage.setItem(this.state.userkey, JSON.stringify(state))
    
}