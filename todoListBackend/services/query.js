var dbObj = require('./db')

// example
async function getAllUser(){
    const rows = await dbObj.query(`select * from userdb`);
    return {
        rows
    }
}

async function checkUser(username, pswd) {
    try {
        const resp = await dbObj.query(`select id,cookie from userdb where (username = '${username}' and userpswd = '${pswd}')`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in authUser");
        return null;
    }
}

async function authUser(id, cookie) {
    try {
        const resp = await dbObj.query(`select username from userdb where id = ${id} and cookie = '${cookie}'`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in authUser");
        return null;
    }
}

async function createTask(user_id, text, status) {
    try {
        const resp = await dbObj.query(`insert into taskList (user_id,text,status) values (${user_id},'${text}','${status}')`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in createTask");
        return null;
    }
}

async function updateTaskStatus(task_id, status) {
    try {
        const resp = await dbObj.query(`update taskList set status = '${status}' where id = ${task_id}`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in updateTaskStatus");
        return null;
    }
}

async function getAllTask(user_id) {
    try {
        const resp = await dbObj.query(`select id,text,status from taskList where status != 'deleted' and user_id = ${user_id} order by created_at`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in getAllTask");
        return null;
    }
}

module.exports = {
    getAllUser, checkUser, authUser, createTask, updateTaskStatus, getAllTask
}