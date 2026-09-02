exports.config = {
    runner: 'local',
    port: 4723,
    path: '/',
    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 14 Simulator',
        'appium:platformVersion': '16.2',
        'appium:automationName': 'XCUITest',
        'appium:app': 'LojaEBAC-sim.app'
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
