var express = require('express')
var router = express.Router()
var dbObjProxy = require("../services/query")

router.use(async function(req, res, next){
    console.log("inside the auth middleware");
    const resp = await dbObjProxy.authUser(req.body.id, req.body.cookie).then(resp => {return resp});
    console.log("Resp in auth middleware: ", resp);
    if(resp.length == 0)
        res.json({"result":"fail.auth", "data":[], "msg":"Authorization failed."})
    // res.username = resp[0].username;
    else next();
})

router.all('/', function(req, res, next) {
    console.log("inside todoList Route: ");
    res.send({result:"success", msg:"This is todoList Route"})
});

router.all('/createTask', async function(req, res, next){
    const id = req.body.id, text = req.body.text, status = 'inprogress';
    let resp = await dbObjProxy.createTask(id, text, status).then(resp => {return resp});
    console.log("Resp in createTask: ", resp);
    if(resp)
        res.json({result:"success", msg:"Task added successfully.", data:[]});
    else
        res.json({result:"fail.insert", msg:"Failed to add the task.", data:[]})
});

router.all('/updateTaskStatus', async function(req, res, next){
    const task_id = req.body.task_id, status = req.body.status;
    if(!["done", "deleted"].includes(status)){
        res.send({result:"fail.param", msg:"Status value is not correct", data:[]});
    }
    else{
        let resp = await dbObjProxy.updateTaskStatus(task_id, status).then(resp => {return resp});
        console.log("Resps in updateTaskStatus: ", resp);
        if(resp && resp.affectedRows > 0)
            res.json({result:"success", msg:"Task status update.", data:[]});
        else
            res.json({result:"fail.update", msg:"Failed to update task status", data:[]});
    }
});

router.all('/getAllTask',async function(req, res, next){
    const user_id = req.body.id;
    let resp = await dbObjProxy.getAllTask(user_id).then(resp => {return resp});
    if(resp){
        res.json({result:"success", msg:"List of tasks.", data:resp})
    }
    else{
        res.json({result:"fail.get", msg:"Failed to get the list of tasks", data:[]});
    }
})

module.exports = router