exports.config = {
    user: 'ebac-student',
    key: 'dummy-sauce-key-12345',
    services: [['sauce', { sauceConnect: false }]],
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
