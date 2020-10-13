const TaskRepo = require('../Data/TaskRepo');
const _taskRepo = new TaskRepo();

exports.toDoTasks = async function(req, res) {
    let username = req.body.username;
    let allTasks = await _taskRepo.allTasks(username);
    let toDoTasks = [];
    if(allTasks == null) {
        return res.json({toDoTasks:toDoTasks});
    }
    for(i=0; i<allTasks.length; i++){
        if(!allTasks[i].complete) {
            toDoTasks.push(allTasks[i])
        }
    }
    return res.json({toDoTasks:toDoTasks});
};

exports.doneTasks = async function(req, res) {
    let username = req.body.username;
    let allTasks = await _taskRepo.allTasks(username);
    let doneTasks = [];
    if(allTasks == null) {
        return res.json({doneTasks:doneTasks});
    }
    for(i=0; i<allTasks.length; i++){
        if(allTasks[i].complete) {
            doneTasks.push(allTasks[i])
        }
    }
    return res.json({doneTasks:doneTasks});
};
