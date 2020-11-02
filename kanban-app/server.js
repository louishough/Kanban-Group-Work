const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const app = express()
const port = 3000;
const { User, Project, Task } = require('./data/database');

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static(__dirname+'/public'));
app.use(express.static('styles'));
app.use(express.static('views/images'));
app.engine('handlebars', handlebars);
app.set('views', __dirname+'/views/')
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const getUser = async(id) => {
    return await User.findByPk(id);
}

// Login - default page
app.get('/', async(req, res) => {
    // data
    res.render('login', {})
});

// TaskList
integratung-frontend-javascript
app.get('/projects/:id', async (req, res) => 
    //data
    res.render('tasklist', {})
});

/*
    USER END POINTS
*/

// Add a User
app.post('/users/add', async(req, res) => {
    const user = await User.create(req.body)
    res.redirect(`/projects/${user.id}`)
});

// Get all users
app.get('/users', async(req, res) => {
    const users = await User.findAll();
    res.send(users);
});

// Get a single users
app.get('/users/:id', async(req, res) => {
    const user = await getUser(req.params.id);
    res.send(user);
});

// Get a single users
app.get('/users/:id/delete', async(req, res) => {
    const user = await getUser(req.params.id);
    user.destroy();
    console.log('User has been.... taken care of');
});

/*
    TASK END POINTS
*/

// Add a task - ID of the project is provided
app.post('/tasks/:id/add', async(req, res) => {
    const project = Project.findByPk(req.params.id);
    const task = await Task.create(req.body);
    project.addTask(task);
    res.redirect(`/projects/${user.id}`)
});

// DELETE a task - ID of the task is provided
app.get('/tasks/:id/delete', async(req, res) => {
    const task = await Task.findByPk(req.params.id);
    task.destroy();
    console.log('Task removed');
});


/*
    PROJECT END POINTS
*/

// Get the users projects
app.get('/projects/:id', async(req, res) => {
    const user = await getUser(req.params.id);
    const projects = await user.getProjects({
        include: [{ model: Task, as: 'tasks' }]
    });

    console.log('Your projects sir', projects);

    res.render('projects', projects)
});

// Add a project
app.post('/project/:id/add', async(req, res) => {
    const user = await getUser(req.params.id);
    const project = await Project.create(req.body)
    user.addProject(project);
    res.redirect(`/projects/${req.params.id}`)
});

// Delete a project
app.post('/project/:id/delete', async(req, res) => {
    const project = await Project.findByPk(req.params.id)
    project.destroy();
    console.log('Project is bye bye');
});

// Single project.. do we need?
app.get('/project/:id', async(req, res) => {
    const project = await Project.findOne({
        where: {
            id: req.params.id
        },
        include: [{ model: Task, as: 'tasks' }]
    });

    console.log('Your single project sir', project);

    res.send(project);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})