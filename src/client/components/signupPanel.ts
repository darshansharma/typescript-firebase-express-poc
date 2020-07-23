import { Component } from "./baseComponent";
import { isFieldValid, doesPasswordMatch } from "../utils/validations";
import { showError } from "../utils/error";
import { HomePanel } from "./homePanel";
import { redirect } from "../utils/helpers";
var firebase = require('firebase');
const axios = require('axios');

export class SignUpPanel extends Component <HTMLFormElement> {
    name: HTMLInputElement ;
    email: HTMLInputElement;
    password: HTMLInputElement;
    repeatPassword: HTMLInputElement;

    constructor() {
        super('signup', 'signup-panel', 'signupPanel');
        this.name = this.element.querySelector("#su-name") as HTMLInputElement;
        this.email = this.element.querySelector("#su-email") as HTMLInputElement;
        this.password = this.element.querySelector("#su-password") as HTMLInputElement;
        this.repeatPassword = this.element.querySelector("#su-rep-password") as HTMLInputElement;
        this.element.addEventListener('submit', this.submitEventHandeler.bind(this));
        this.element.querySelector('#login-btn')?.addEventListener('click', this.redirectToLoginPanel.bind(this));
    }

    private redirectToLoginPanel() {
        this.removeSignUpPanel();
        redirect('login');
    }

    private removeSignUpPanel() {
        this.clearInput();
        this.hostEl.classList.add("hide");
    }

    private clearInput() {
        this.name.value = "";
        this.email.value = "";
        this.password.value = "";
        this.repeatPassword.value = "";
    }

    private getUserInput(): [string, string, string] | void{
        const nameObj = {
            value: this.name.value,
            required: true,
            maxLength: 20,
            minLength: 2
        }

        const emailObj = {
            value: this.email.value,
            required: true,
        };

        const passwordObj = {
            value: this.password.value,
            required: true,
            maxLength: 12,
            minLength: 4,
        };

        const repeatPasswordObj = {
            value: this.repeatPassword.value,
            required: true,
            maxLength: 12,
            minLength: 4,
        };
        
        if (!isFieldValid(nameObj) || !isFieldValid(emailObj) || 
            !isFieldValid(passwordObj) || !isFieldValid(passwordObj) || 
            !doesPasswordMatch(passwordObj.value, repeatPasswordObj.value)) {
            alert('Invalid data supplied');
            return;
        } else {
            return [nameObj.value, emailObj.value, passwordObj.value];
        }
    }

    private resetOldAlerts() {
        (<HTMLInputElement>document.getElementById("alert-msg")!).classList.remove('danger-alert');
    }

    private submitEventHandeler(event: Event) {
        this.resetOldAlerts();
        event.preventDefault();
        const userInput = this.getUserInput();
        if (userInput){
            const [userName, userEmail, userPassword] = userInput;
            this.createUser(userName, userEmail, userPassword);
        }
        
    }

    private createUser(name: string, email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((res:any) => {
            console.log('User created successfully');
            (<HTMLInputElement>document.getElementById("sign-up-btn")!).disabled = true;
            (<HTMLInputElement>document.getElementById("alert-msg")!).innerHTML = "Account created successfully";
            (<HTMLInputElement>document.getElementById("alert-msg")!).classList.add("success-alert");
            setTimeout(() => {
                const user = {
                    uid: res.uid.toString(),
                    name,
                    email,
                };
                axios.post("http://localhost:4000/storeUserData", user).then((response: any) => {
                    this.removeSignUpPanel();
                    redirect('home');
                }).catch(function (error: Error) {
                    console.log(error);
                });
            }, 2000);
        }).catch(function(error: Error) {
            (<HTMLInputElement>document.getElementById("alert-msg")!).innerHTML = error.message;
            (<HTMLInputElement>document.getElementById("alert-msg")!).classList.add("danger-alert");
            showError('Error while creating user', error);
        });
    }
}