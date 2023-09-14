var express = require('express');
var router = express.Router();
const dbObjProxy = require('../services/query')

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('User route');
});

router.all('/allusers', async function(req, res, next) {
	const resp = await dbObjProxy.getAllUser();
	let temp_user_list = [];
	if(!resp){
		res.json({
			result:"failed", 
			msg:"user not found. Please try again.", 
			data:[]
		});
	}
	resp.rows.forEach(element => {
		// console.log(element);
		temp_user_list.push(element.username)
	});
	console.log("Resp in allusers: ", resp);
	// res.send('Requested for login');
	res.json({
		result:"success", 
		msg:"Successfully got all users.", 
		data:temp_user_list
	})
	
})

router.all('/login', async function(req, res, next) {
	const username = req.body.username, userpswd = req.body.userpswd;
	console.log("Fired SQL");
	await dbObjProxy.checkUser(username, userpswd).then(resp => {
		console.log("Resp: ", resp);
		if (resp && resp.length == 1) {
			res.json({
				result:"success", 
				msg:"Successfully loged in.", 
				data:[{id:resp[0].id, cookie:resp[0].cookie}]
			})
		}else{
			res.json({
				result:"failed", 
				msg:"user not found. Please try again.", 
				data:[]
			})
		}
	});
	// res.send('Requested for login');
	
});

router.all('/logout', async (req, res, next) => {
	const id = req.body.id, cookie = req.body.cookie;
	let resp = await dbObjProxy.authUser(id, cookie).then(resp => {
		return resp;
	})
	console.log("Resp in logout: ", resp);
	if(resp && resp.length){
		res.json({result:"success", data:[], msg:"User logged out successfully."})
	}else{
		res.json({"result":"fail.auth", "data":[], "msg":"Authorization failed."})
	}
});

module.exports = router;
