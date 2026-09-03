import LoginPage from '../pageobjects/login.page.js';

describe('Fluxo de Login', () => {
    it('deve logar com sucesso usando credenciais válidas', async () => {
        await LoginPage.login('teste@email.com', 'senha123');
        await expect(LoginPage.successMessage).toBeDisplayed();
    });
});