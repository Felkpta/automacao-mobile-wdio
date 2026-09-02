class LoginPage {
    get inputEmail() { return $('~email'); }
    get inputPassword() { return $('~password'); }
    get btnLogin() { return $('~btnLogin'); }

    async login(email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }
}
module.exports = new LoginPage();
