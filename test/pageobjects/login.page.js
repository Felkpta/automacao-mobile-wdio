class LoginPage {
    get tabButtonLogin() { return $('~login'); }
    get loginScreen() { return $('~login-screen'); }
    get loginContainerButton() { return $('~button-login-container'); }
    get inputEmail() { return $('~input-email'); }
    get inputPassword() { return $('~input-password'); }
    get btnLogin() { return $('~button-LOGIN'); }
    get successMessage() { return $('android=new UiSelector().textContains("Success")'); }

    async login(email, password) {
        await this.tabButtonLogin.click();
        await this.loginScreen.waitForDisplayed();
        await this.loginContainerButton.click();
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }
}

export default new LoginPage();