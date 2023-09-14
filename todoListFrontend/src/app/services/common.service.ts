import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	private baseurl = "http://localhost:3000/";

	constructor(private http : HttpClient) { }

	login(user:string , pswd:string){
		const param = new HttpParams()
			.set("username",user)
			.set("userpswd",pswd);
		return this.http.post<any>(this.baseurl + "user/login", param).toPromise();
	}

	logout(){
		const param = new HttpParams()
			.set("id",<string>localStorage.getItem("todolist_user_id"))
			.set("cookie",<string>localStorage.getItem("todolist_cookie"));
		return this.http.post<any>(this.baseurl + "user/logout", param).toPromise();
	}

	getAllTask(){
		const param = new HttpParams()
			.set("id",<string>localStorage.getItem("todolist_user_id"))
			.set("cookie",<string>localStorage.getItem("todolist_cookie"));
		return this.http.post<any>(this.baseurl + "todoList/getAllTask", param).toPromise();
	}

	createTask(text:string){
		const param = new HttpParams()
			.set("id",<string>localStorage.getItem("todolist_user_id"))
			.set("cookie",<string>localStorage.getItem("todolist_cookie"))
			.set("text",text);
		return this.http.post<any>(this.baseurl + "todoList/createTask", param).toPromise();
	}

	updateTaskStatus(status:string, task_id:number){
		const param = new HttpParams()
			.set("id",<string>localStorage.getItem("todolist_user_id"))
			.set("cookie",<string>localStorage.getItem("todolist_cookie"))
			.set("task_id",task_id)
			.set("status",status);
		return this.http.post<any>(this.baseurl + "todoList/updateTaskStatus", param).toPromise();
	}

}
