var HomeController   = require('./Controllers/HomeController');
var UserController   = require('./Controllers/UserController');
var TaskController  = require('./Controllers/TaskController');
const authMiddleware = require('./authHelper')
const cors           = require('cors');


// Routes
module.exports = function(app){  
    // Main Routes

    app.post('/CreateUser', cors(), UserController.RegisterUser);

    // Sign in
    app.post(
        '/auth', cors(),
        // middleware that handles the sign in process
        authMiddleware.signIn,
        authMiddleware.signJWTForUser
        );

    app.post('/toDoTasks', cors(), HomeController.toDoTasks);
    app.post('/doneTasks', cors(), HomeController.doneTasks);
    app.post('/newTask', cors(), TaskController.CreateNewTask);
    app.post('/deleteTask', cors(), TaskController.Delete);

    app.post('/completeTask', cors(), TaskController.Complete);
    app.post('/markTask', cors(), TaskController.Highlight);

    };
