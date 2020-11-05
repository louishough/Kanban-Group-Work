import app from 'apprun';

const element = document.getElementById('my-app');

//routing for various apprun components using #hash
@on('//', async () => {
const module = await import('./login')
new module.default().mount(element);
})

@on('#login', async () => {
const module = await import('./login')
new module.default().mount(element);
})

@on('#projects', async () => {
const module = await import('./projects');
new module.default().mount(element);
})

@on('#tasks', async () => {
const module = await import('./tasks');
new module.default().mount(element);
})
  
