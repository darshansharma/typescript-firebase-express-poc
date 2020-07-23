import { Component } from "./baseComponent";
import { isFieldValid } from "../utils/validations";
import { showError } from "../utils/error";
import { redirect } from "../utils/helpers";
var firebase = require('firebase');

export class LoginPanel extends Component <HTMLFormElement> {
    email: HTMLInputElement;
    password: HTMLInputElement;

    constructor() {
        super('login', 'login-panel', 'loginPanel');
        this.email = this.element.querySelector("#si-email") as HTMLInputElement;
        this.password = this.element.querySelector("#si-password") as HTMLInputElement;
        this.element.addEventListener('submit', this.submitEventHandeler.bind(this));
        this.element.querySelector('#signup-btn')?.addEventListener('click', this.redirectToSignUpPanel.bind(this));

    }

    private redirectToSignUpPanel() {
        this.removeLoginPanel();
        redirect('signup');
    }

    private removeLoginPanel() {
        this.clearInput();
        this.hostEl.classList.add("hide");
    }

    private clearInput() {
        this.email.value = "";
        this.password.value = "";
    }

    private getUserInput(): [string, string] | void{
        const emailObj = {
            value: this.email.value,
            required: true,
        };

        const passwordObj = {
            value: this.password.value,
            required: true,
            maxLength: 12,
            minLength: 6,
        };

        if (!isFieldValid(emailObj) || !isFieldValid(passwordObj)) {
            alert('Invalid data supplied');
            return;
        } else {
            return [emailObj.value, passwordObj.value];
        }
    }

    private submitEventHandeler(event: Event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        if (userInput){
            const [userEmail, userPassword] = userInput;
            this.login(userEmail, userPassword);
            this.clearInput();
        }
        
    }

    private login(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then((res: any) => {
            if(typeof res.uid === "string") {
                (<HTMLInputElement>document.getElementById("sign-in-btn")!).disabled = true;
                (<HTMLInputElement>document.getElementById("alert-msg")!).classList.add("success-alert");
                (<HTMLInputElement>document.getElementById("alert-msg")!).innerHTML = "Logging In ....";
                setTimeout(() => {
                    this.removeLoginPanel();
                    redirect('home')
                }, 2000)
            }
        }).catch(function(error: Error) {
            showError('Error while logging in', error);
        });
    }
}