import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { CommonService } from 'src/app/services/common.service';
// import { GlobalConstants }  from 'src/global_var';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
	login_form!: FormGroup;
		constructor(private route : Router,public fb: FormBuilder, private commonService:CommonService) {
	}
	 

	ngOnInit(): void {
		this.login_form = this.fb.group({
			mail: ['',[Validators.required]],
			password:['',[Validators.required]]
		});
	}
	async onsubmit(){
		if(!this.login_form?.value.mail || !this.login_form.value.password){
			alert("Please fill the required fields");
			return;
		}
		if(!this.login_form.valid){
			alert("Fill the form correctly!");
			return;
		}
		this.commonService.login(this.login_form?.value.mail, this.login_form.value.password).then(resp => {
			if(resp.result == "success"){
				localStorage.setItem("todolist_user_id", resp.data[0].id);
				localStorage.setItem("todolist_cookie", resp.data[0].cookie);
				this.route.navigate(["/todolist"]);
			}else{
				alert("User not found. Please give right creds.")
			}
		}).catch(err => {
			alert("Got error while processing the request. Please try again.");
			console.log("Error", err);
			
		})
		
	}

	forgetpswd(){
		this.route.navigate(['/forgetpassword']);
	}
}
