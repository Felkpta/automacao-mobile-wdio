class LoginPage {
  get inputEmail() { return $('~input-email'); }
  get inputPassword() { return $('~input-password'); }
  get btnLogin() { return $('~button-LOGIN'); }
  get successMessage() { return $('android=new UiSelector().textContains("Success")'); }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }
}

module.exports = new LoginPage();