const Task = require('../Models/Task')

class TaskRepo {
    TaskRepo() {
    }

    async create(taskObj) {
        try {
            var error = await taskObj.validateSync();

            if(error) {
                let resopnse = { obj: taskObj,
                                 errorMessage: error.message};
                return resopnse;
            }
            const result = await taskObj.save();
            let resopnse = { obj: result,
                             errorMessage: ''};
            return resopnse; 
        }
        catch(err) {
            let resopnse = { obj: taskObj,
                errorMessage: error.message}; 
                return resopnse;
        }
    }

    async delete(taskID) {
        let deletedTask = await Task.deleteOne({_id:taskID}).exec();
        return deletedTask;
    }

    async update(taskID, updating) {
        let newTask = await Task.findOneAndUpdate({_id:taskID}, updating).exec();
        return newTask;
    }

    async getTaskbyUser(username) {
        let selectedTask = await Task.findOne({user:username}).exec();
        return selectedTask
    } 

    async allTasks(username) {
        let userTasks = [];
        let allTasks = await Task.find().exec();
        for(let i=0; i<allTasks.length; i++) {
            if(allTasks[i].user == username) {
                userTasks.push(allTasks[i])
            }
        }
        return userTasks;
    }


}

module.exports = TaskRepo;