import app from 'apprun';


const element = document.getElementById('my-app');

//routing for various apprun components using #hash
app.on('//', async () => {
  
})

app.on('#login', async () => {
const module = await import('./login')
new module.default({type: 'Users'}).mount(element);
})

app.on('#projects', async () => {
const module = await import('./projects');
new module.default().mount(element);
})

app.on('#tasks', async (type='my-todos') => {
    const module = await import('./tasks');
    new module.default({type}).mount(element);
})
  
