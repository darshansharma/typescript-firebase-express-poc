import { Component } from "./baseComponent";
import { showError } from "../utils/error";
var firebase = require('firebase');
const axios = require('axios');

export class HomePanel extends Component <HTMLFormElement> {
    name: string = "";
    constructor() {
        super('home-page', 'home', "homePanel");
        this.getCurrentLoggedInUserData();
        this.element.querySelector('#logout-btn')!.addEventListener('submit', this.LogOutUser.bind(this));
    }

    private setUserDetails(userData: any) {
        this.name = userData.name;
        this.hostEl.querySelector("#userName")!.innerHTML = "Hi " + this.name;
    }

    private getCurrentLoggedInUserData() {
        const userUIDObj = {
            uid: firebase.auth().currentUser.uid
        };
        axios.post('http://localhost:4000/getUserData', userUIDObj).then((response: any) => {
            this.setUserDetails(response.data);
        }).catch(function (error: Error) {
            showError('Error while fetching user Data', error);
        });
    }

    private removeHomePanel() {
        this.element.classList.add("hide");
    }

    private LogOutUser() {
        this.removeHomePanel();
        firebase.auth().signOut().then((res: any) => {
            console.log('res - ', res);
            // redirect('login');
        }).catch((err: Error) => {
            showError('Error while signout', err);
        });
        
    }
}