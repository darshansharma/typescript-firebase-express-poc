import { LoginPanel } from "../components/loginPanel";
import { SignUpPanel } from "../components/signupPanel";
import { HomePanel } from "../components/homePanel";
export function redirect(redirectTo) {
    if (redirectTo === "login") {
        if (document.getElementById('loginPanel')) {
            document.getElementById('loginPanel').classList.remove('hide');
        }
        else {
            new LoginPanel();
        }
    }
    else if (redirectTo === "signup") {
        if (document.getElementById('signupPanel')) {
            document.getElementById('signupPanel').classList.remove('hide');
        }
        else {
            new SignUpPanel();
        }
    }
    else if (redirectTo === "home") {
        if (document.getElementById('homePanel')) {
            document.getElementById('homePanel').classList.remove('hide');
        }
        else {
            new HomePanel();
        }
    }
}
//# sourceMappingURL=helpers.js.map