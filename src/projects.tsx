import app, { Component } from 'apprun';

type Project = {
  id: string,
  title: string,
  description?: string,
  projectUrl?: string,
  owner: object,
  dateCreated: number
}
const usersStorageKey:string = 'users';
const STORAGE_KEY:string='projects';

export default class Projects extends Component {
  state = {
    pagetitle: 'Projects Page',
    projects: [],
    storageKey: ''
  }

  view = (state) => 
  <div>
  {state.pageTitle}

  {state.projects.map((project)=>{
  return (<div key={project} class="container mx-auto h-full flex justify-center items-center order-none border-4">
  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div class="h-48 lg:h-auto lg:w-48 flex-none object-cover object-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
      <img src={project.projectUrl} />
    </div>
      <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
          <p class="text-sm text-gray-600 flex items-center">
            <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Private Project
          </p>
          <div class="text-gray-900 font-bold text-xl mb-2"><a href={'#tasks/'+ project.id } >{project.title}</a></div>
            <p class="text-gray-700 text-base">{project.description}</p>
          </div>
          <div class="flex items-center">
            <img class="w-10 h-10 rounded-full mr-4" src="https://ichef.bbci.co.uk/news/800/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg" alt="Avatar of Jonathan Reinink" />
              <div class="text-sm">
                <p class="text-gray-900 leading-none">{project.owner.name}</p>
                <p class="text-gray-600">{new Date(project.dateCreated).toLocaleDateString() }</p>
              </div>
          </div>
      </div>
    </div> 
  </div>)
  })}


    <form onsubmit={(event) => this.run('add-project', event)} class="w-full max-w-lg">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    Title
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" name='title' id="grid-password" type="text" placeholder="JohnSmith" />
                <p class="text-grey-dark text-xs italic">Must be unique!</p>
            </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    Image
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="url" name='project-url' placeholder="http://example.com/img.jpeg" />
                <p class="text-grey-dark text-xs italic">.png, .jpeg, etc</p>
            </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    Notes
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" name='description' type="text" placeholder="eg. this is due on the 14th of November" />
            </div>
        </div>
                <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Add Project</button>
    </div>
    </form>
  
  
  
  
  
  
  
  </div>;

  update = {
    '#projects': state=>state,

    'add-project': (state, event) => {
      event.preventDefault();
      const addProjectForm = new FormData(event.target);

      const project:Project = {
        id: guidGenerator(),
        title: addProjectForm.get('title').toString(),
        projectUrl: addProjectForm.get('project-url').toString(),
        description: addProjectForm.get('description').toString(),
        owner: getCurrentUser(),
        dateCreated: Date.now()
      }
      return ({...state, projects: [...state.projects, project]})

    }
  }
  constructor() {
    super()
    const storageKey:string = `${STORAGE_KEY}`
    const stored:string = localStorage.getItem(storageKey)
    this.state = stored ? JSON.parse(stored) : {...this.state, storageKey}
}
rendered = (state) => localStorage.setItem(this.state.storageKey, JSON.stringify(state))

  
}

const getCurrentUser = ()=>{
  const data = localStorage.getItem(usersStorageKey);
  const users = data ? JSON.parse(data).users : {};
  return users.find(user => user.loggedIn===true);
}

const guidGenerator = () =>{
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
