export const config = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    
    hostname: 'hub.browserstack.com',
    
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '12.0',
        'appium:deviceName': 'Google Pixel 6',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.BS_APP_URL || './app/native-demo-app.apk',
        'bstack:options': {
            projectName: 'Automacao Mobile WDIO',
            buildName: 'browserstack-build-ci',
            sessionName: 'Execution Test',
            debug: true,
            networkLogs: true
        }
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    services: ['browserstack'],
    
    framework: 'mocha',
    reporters: ['spec'],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};