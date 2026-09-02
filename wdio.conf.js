exports.config = {
    autoCompileOpts: {
        autoCompile: false
    },
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce'],
    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 14 Simulator',
        'appium:platformVersion': '16.2',
        'appium:automationName': 'XCUITest',
        'appium:app': 'storage:filename=LojaEBAC-sim.app.zip'
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
