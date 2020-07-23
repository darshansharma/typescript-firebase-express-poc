import { Component } from "./baseComponent";
import { showError } from "../utils/error";
var firebase = require('firebase');
const axios = require('axios');
export class HomePanel extends Component {
    constructor() {
        super('home-page', 'home', "homePanel");
        this.name = "";
        this.getCurrentLoggedInUserData();
        this.element.querySelector('#logout-btn').addEventListener('submit', this.LogOutUser.bind(this));
    }
    setUserDetails(userData) {
        this.name = userData.name;
        this.hostEl.querySelector("#userName").innerHTML = "Hi " + this.name;
    }
    getCurrentLoggedInUserData() {
        const userUIDObj = {
            uid: firebase.auth().currentUser.uid
        };
        axios.post('http://localhost:4000/getUserData', userUIDObj).then((response) => {
            this.setUserDetails(response.data);
        }).catch(function (error) {
            showError('Error while fetching user Data', error);
        });
    }
    removeHomePanel() {
        this.element.classList.add("hide");
    }
    LogOutUser() {
        this.removeHomePanel();
        firebase.auth().signOut().then((res) => {
            console.log('res - ', res);
            // redirect('login');
        }).catch((err) => {
            showError('Error while signout', err);
        });
    }
}
//# sourceMappingURL=homePanel.js.map