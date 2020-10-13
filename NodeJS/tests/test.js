// Import the dependencies for testing
var chai = require('chai')
var chaiHttp = require('chai-http');
var app = require('../app.js');

const Task = require('../Models/Task')
const User = require('../Models/User');
const UserRepo       = require('../Data/UserRepo');
const _userRepo      = new UserRepo();


var task = Task;


// Configure chai.
chai.use(chaiHttp);
chai.should();

describe("TDL", () => {
    it("Tests POST new task and receipt of 'errorMessage' from API.",
        async () => {
            chai.request(app)
                .post(`/newTask`)
                .send({
                    "name": "test task",
                    "deadline": "2020-06-20T19:12:00.000Z",
                    "description": "test",
                    "username": "test user",
                })
                .end((err, res) => {
                    let errorMessage = res.body.errorMessage;
                    errorMessage.should.equal('')
                });
        });
    it("Tests GET to do tasks of test user from API.",
        async () => {
            chai.request(app)
                .post(`/toDoTasks`)
                .send({
                    "username": "test user",
                })
                .end((err, res) => {
                    let toDoTasks = res.body.toDoTasks;
                    toDoTasks.length.should.equal(1)

                });
        });
        it("Tests POST complete task of test user from API.",
        async ()=> {
            task = await Task.findOne({user:"test user"}).exec();
    
        
            chai.request(app)
                .post(`/completeTask`)
                .send({
                    task: {_id:task._id}
                })
                .end((err, res) => {
                    let message = res.body.message;
                    message.should.equal("task completed")
                });
        });    
        it("Tests GET done tasks of test user from API.",
        async () => {
            chai.request(app)
                .post(`/doneTasks`)
                .send({
                    "username": "test user",
                })
                .end((err, res) => {
                    let doneTasks = res.body.doneTasks;
                    doneTasks.length.should.equal(1)

                });
        });
        it("Tests POST hight task of test user from API.",
        async ()=> {
            chai.request(app)
                .post(`/markTask`)
                .send({
                    task: {_id:task._id}
                })
                .end((err, res) => {
                    let message = res.body.message;
                    message.should.equal("task marked")
                });
        }); 
        it("Tests DELETE task of test user from API.",
        async ()=> {
            chai.request(app)
                .post(`/deleteTask`)
                .send({
                    task: {_id:task._id}
                })
                .end((err, res) => {
                    let message = res.body.message;
                    message.should.equal("task deleted")
                });
        }); 
        it("Tests faile to CREATE a new user from API.",
        async () => {
            chai.request(app)
                .post(`/CreateUser`)
                .send({
                    "username": "testuser",
                    "password": "123",
                    "passwordConfirm": "123123",
                    "firstName": "123",
                    "lastName": "123",
                    "email": "123"
                })
                .end((err, res) => {
                    let message = res.body.errorMessage.message;
                    message.should.equal('Passwords do not match.')
                });
        });
        it("Tests faile to CREATE a new user from API 2nd.",
        async () => {
            chai.request(app)
                .post(`/CreateUser`)
                .send({
                    "username": "",
                    "password": "123",
                    "passwordConfirm": "123",
                    "firstName": "123",
                    "lastName": "123",
                    "email": "123"
                })
                .end((err, res) => {
                    let message = res.body.errorMessage.message;
                    message.should.equal('No username was given')
                });
        });
 

});
