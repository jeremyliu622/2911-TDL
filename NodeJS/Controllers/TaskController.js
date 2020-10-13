const Task = require('../Models/Task');
const TaskRepo = require('../Data/TaskRepo');
const _taskRepo = new TaskRepo();
const UserRepo       = require('../Data/UserRepo');
const _userRepo      = new UserRepo();


exports.CreateNewTask = async function (req, res) {
    let tempTaskObj = new Task({
        'name': req.body.name,
        'deadline': req.body.deadline,
        'description': req.body.description,
        'complete': null,
        'color': "regular",
        'user': req.body.username
    })
    let responseObj = await _taskRepo.create(tempTaskObj);    

    if (responseObj.errorMessage == '') {
        res.json({
            errorMessage: ''
        });
    }
    else {
        res.json({
            errorMessage: responseObj.errorMessage
        });
    }
}

exports.Delete = async function (req, res) {
    let taskID =  req.body.task._id;
    let username = req.body.username;
    let deleteTask = await _taskRepo.delete(taskID);

    res.json({ message:"task deleted" })

}

exports.Complete = async function (req, res) {
    let taskID =  req.body.task._id;
    let now = Date.now();
    let completeTime = new Date(now)
    let updating = {complete: completeTime};
    let completeTask = await _taskRepo.update(taskID, updating);
    res.json({ message:"task completed" })

}

exports.Highlight = async function (req, res) {
    let taskID =  req.body.task._id;
    let color  =  req.body.task.color;
    let updating = {color: color};
    let highlightTask = await _taskRepo.update(taskID, updating);
    res.json({ message:"task marked" })

}

