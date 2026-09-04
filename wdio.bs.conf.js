export const config = {
    // Credenciais de acesso do BrowserStack (variáveis de ambiente com fallback)
    user: process.env.BROWSERSTACK_USERNAME || 'cruzeiro_ckxpR6',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'NuGQhyPbgpzZfWHhpgyM',

    // Caminho para os arquivos de teste
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],

    maxInstances: 1,

    // Integração nativa com a nuvem do BrowserStack
    services: ['browserstack'],

    // Configuração do dispositivo de testes
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '12.0',
        'appium:deviceName': 'Google Pixel 6',
        'appium:automationName': 'UiAutomator2',
        
        
        'appium:app': process.env.BS_APP_URL || 'bs://b815d4490a45cd1d10b59a4c2fa389e1583fbfb2',
        
        'bstack:options': {
            projectName: 'Automacao Mobile WDIO',
            buildName: 'browserstack-build-ci',
            sessionName: 'Execution Test',
            debug: true,
            networkLogs: true
        }
    }],

    // Configurações do runner do WebdriverIO
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // Framework de testes e timeouts
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};