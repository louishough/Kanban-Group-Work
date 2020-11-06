import app, { Component } from 'apprun';

type Project = {
  id: string,
  title: string,
  ownerid: number
}

export default class Projects extends Component {
  state = 'Projects Page'

  view = (state) => 
  <div>
  {state}

  <div class="container mx-auto h-full flex justify-center items-center">
    <div class="max-w-sm w-full lg:max-w-full lg:flex">
      <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tennis_Racket_and_Balls.jpg/220px-Tennis_Racket_and_Balls.jpg')" title="Woman holding a mug">
      </div>
        <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <p class="text-sm text-gray-600 flex items-center">
              <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Private Project
            </p>
            <div class="text-gray-900 font-bold text-xl mb-2">Enter into regional tennis competition</div>
              <p class="text-gray-700 text-base">Notes: Will require skills to improve</p>
            </div>
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4" src="https://ichef.bbci.co.uk/news/800/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg" alt="Avatar of Jonathan Reinink" />
                <div class="text-sm">
                  <p class="text-gray-900 leading-none">Jonathan Reinink</p>
                  <p class="text-gray-600">Aug 18</p>
                </div>
            </div>
        </div>
      </div> 
    </div>
  

    <form class="w-full max-w-lg">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    Title
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" placeholder="JohnSmith" />
                <p class="text-grey-dark text-xs italic">Must be unique!</p>
            </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    Image
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="url" placeholder="http://example.com/img.jpeg" />
                <p class="text-grey-dark text-xs italic">.png, .jpeg, etc</p>
            </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    Notes
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" placeholder="eg. this is due on the 14th of November" />
            </div>
        </div>
                <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Add Project</button>
    </div>
    </form>
  
  
  
  
  
  
  
  </div>;

  update = {
    '#projects': state=>state, // <-- THIS!! 
  }
  
}

