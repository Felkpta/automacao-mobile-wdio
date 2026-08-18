const LoginPage = require('../pageobjects/login.page');

describe('Fluxo de Login', () => {
  it('deve logar com sucesso usando credenciais válidas', async () => {
    await LoginPage.login('teste@email.com', 'senha123');
    await expect(LoginPage.successMessage).toBeDisplayed();
  });
});