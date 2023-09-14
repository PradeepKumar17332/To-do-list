import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

	completed: boolean = false;
	pendingTask: any[] = [];
	completedTask:any[] = [];
	// newTodoForm = this.formBuilder.group({
	// 	todoItem: ''
	// })
	constructor(private commonService:CommonService, private route : Router) { }

	ngOnInit(): void {
		this.pendingTask = [];
		this.getAllTask();
	}

	getAllTask(){
		this.pendingTask = [];
		this.completedTask = [];
		this.commonService.getAllTask().then(resp => {
			if(resp.result == "success"){
				// this.pendingTask = resp.data;
				resp.data.forEach((element: any) => {
					if(element.status == 'inprogress'){
						this.pendingTask.push(element);
					}else if(element.status == 'done'){
						this.completedTask.push(element);
					}
				});
				console.log("Pending Task: ", this.pendingTask);
				console.log("Completed Task: ", this.completedTask);
			}else if(resp.result == "fail.auth"){
				alert("Authorization failed. Please login again.");
				this.route.navigate(["/"]);
			}else{
				alert("Got error while processing the request");
				this.pendingTask = [];
			}
		}).catch(err =>{
			console.log("Error while processing request.", err);
			alert("Error while processing error request.");
		})
	}


	addTask() {
		let ele = <HTMLInputElement>document.getElementById("task_text");
		let value:string = ele.value;
		if(value.length == 0){
			alert("Enter some task!!");
			return;
		}
		console.log("insidde addtak", value);
		this.commonService.createTask(value).then(resp =>{
			if(resp.result == "success"){
				ele.value = "";
				this.getAllTask();
			}else if(resp.result == "fail.auth"){
				alert("Authorization failed. Please login again.");
				this.route.navigate(["/"]);
			}else{
				alert("Got error while processing the request");
				this.pendingTask = [];
			}
		}).catch(err =>{
			console.log("Error while processing request.", err);
			alert("Error while processing error request.");
		})
	}
	
	removeTask(data: any) {
		console.log("in remove task", data);
		this.commonService.updateTaskStatus("deleted", data.id).then(resp =>{
			if(resp.result == "success"){
				this.getAllTask();
			}else if(resp.result == "fail.auth"){
				alert("Authorization failed. Please login again.");
				this.route.navigate(["/"]);
			}else{
				alert("Got error while processing the request");
			}
		}).catch(err =>{
			console.log("Error while processing request.", err);
			alert("Error while processing error request.");
		})
	}
	
	markDone(data: any) {
		console.log("in markDone", data);
		this.commonService.updateTaskStatus("done", data.id).then(resp =>{
			if(resp.result == "success"){
				this.getAllTask();
			}else if(resp.result == "fail.auth"){
				alert("Authorization failed. Please login again.");
				this.route.navigate(["/"]);
			}else{
				alert("Got error while processing the request");
			}
		}).catch(err =>{
			console.log("Error while processing request.", err);
			alert("Error while processing error request.");
		})
	}

	logout(){
		this.commonService.logout().then(resp =>{
			if(resp.result == "success"){
				this.route.navigate(["/"]);
			}else if(resp.result == "fail.auth"){
				alert("Authorization failed. Please login again.");
				this.route.navigate(["/"]);
			}else{
				alert("Got error while processing the request");
			}
		}).catch(err =>{
			console.log("Error while processing request.", err);
			alert("Error while processing error request.");
		})
	}
	  
}
