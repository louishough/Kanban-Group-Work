import app from 'apprun';
import TaskComponent from './tasks';
import Projects from './projects';
import Login from './login';

const state = 'Hello world - AppRun !';

const view = (state) => <div>
  


const update = {

  '#/': async (state, page) => {
    return await this.updateState(state, '', page)
  },
  '#/feed': async (state, page) => {
    return await this.updateState(state, 'feed', page)
  },
'#/tag': async (state, tag, page) => {
    return await this.updateState(state, 'tag', page, tag)
  
}
  
};

app.start(document.body, state, view, update);
