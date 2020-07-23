import { Component } from "./baseComponent";
import { isFieldValid, doesPasswordMatch } from "../utils/validations";
import { showError } from "../utils/error";
import { redirect } from "../utils/helpers";
var firebase = require('firebase');
const axios = require('axios');
export class SignUpPanel extends Component {
    constructor() {
        var _a;
        super('signup', 'signup-panel', 'signupPanel');
        this.name = this.element.querySelector("#su-name");
        this.email = this.element.querySelector("#su-email");
        this.password = this.element.querySelector("#su-password");
        this.repeatPassword = this.element.querySelector("#su-rep-password");
        this.element.addEventListener('submit', this.submitEventHandeler.bind(this));
        (_a = this.element.querySelector('#login-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.redirectToLoginPanel.bind(this));
    }
    redirectToLoginPanel() {
        this.removeSignUpPanel();
        redirect('login');
    }
    removeSignUpPanel() {
        this.clearInput();
        this.hostEl.classList.add("hide");
    }
    clearInput() {
        this.name.value = "";
        this.email.value = "";
        this.password.value = "";
        this.repeatPassword.value = "";
    }
    getUserInput() {
        const nameObj = {
            value: this.name.value,
            required: true,
            maxLength: 20,
            minLength: 2
        };
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
        }
        else {
            return [nameObj.value, emailObj.value, passwordObj.value];
        }
    }
    resetOldAlerts() {
        document.getElementById("alert-msg").classList.remove('danger-alert');
    }
    submitEventHandeler(event) {
        this.resetOldAlerts();
        event.preventDefault();
        const userInput = this.getUserInput();
        if (userInput) {
            const [userName, userEmail, userPassword] = userInput;
            this.createUser(userName, userEmail, userPassword);
        }
    }
    createUser(name, email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
            console.log('User created successfully');
            document.getElementById("sign-up-btn").disabled = true;
            document.getElementById("alert-msg").innerHTML = "Account created successfully";
            document.getElementById("alert-msg").classList.add("success-alert");
            setTimeout(() => {
                const user = {
                    uid: res.uid.toString(),
                    name,
                    email,
                };
                axios.post("http://localhost:4000/storeUserData", user).then((response) => {
                    this.removeSignUpPanel();
                    redirect('home');
                }).catch(function (error) {
                    console.log(error);
                });
            }, 2000);
        }).catch(function (error) {
            document.getElementById("alert-msg").innerHTML = error.message;
            document.getElementById("alert-msg").classList.add("danger-alert");
            showError('Error while creating user', error);
        });
    }
}
//# sourceMappingURL=signupPanel.js.map