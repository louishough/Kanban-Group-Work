const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const app = express()
const port = 3001;
const { User, Project, Task } = require('./data/database');
var http = require('http').createServer(app);
const io = require('socket.io').listen(http);

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static(__dirname + '/public'));
app.use(express.static('styles'));
app.use(express.static('views/images'));
app.engine('handlebars', handlebars);
app.set('views', __dirname + '/views/')
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const getUser = async(id) => {
    return await User.findByPk(id);
}

// Login - default page
app.get('/', async(req, res) => {
    const users = await User.findAll();
    console.log('hello', users)
    res.render('login', {users})
});

// TaskList



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

app.get('/tasks/:id', async(req, res) => {
    const data = await getUser(req.params.id);
    const tasks = await data.getTasks();
    res.render('tasklist', { tasks });
});


/*
    PROJECT END POINTS
*/

// Get the users projects
app.get('/projects/:id', async(req, res) => {
    const user = await getUser(req.params.id);
    const projects = await user.getProjects();

    res.render('projects', { projects, userid: req.params.id })
});

// Add a project
app.post('/project/add', async(req, res) => {
    const { name, userid } = req.body;
    const user = await getUser(userid);
    console.log('Hi User', user);
    const project = await Project.create({ name, userId: Number(userid) })
    await user.addProject(project);
    console.log('Added project', project);
    console.log('Body Provided', req.body);
    res.redirect(`/projects/${userid}`)
});

// Delete a project
app.post('/project/:id/delete', async(req, res) => {
    const project = await Project.findByPk(req.params.id)
    project.destroy();
    console.log('Project is bye bye');
    console.log(req.get('host'));
    res.redirect('/projects/1');
});

// Single project.. do we need?
app.get('/project/:id', async(req, res) => {
    const project = await Project.findOne({
        where: {
            id: req.params.id
        },
        include: [{ model: Task, as: 'tasks' }]
    });

    console.log('Your single project sir', { project });

    res.send(project);
});


http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})