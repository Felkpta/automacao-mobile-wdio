import path from 'path';

export const config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.js'],
    maxInstances: 1,
    autoCompileOpts: {
        autoCompile: false,
    },
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Emulator',
        'appium:app': path.join(process.cwd(), 'app/native-demo-app.apk'),
        'appium:autoGrantPermissions': true,
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: { ui: 'bdd', timeout: 120000 },
};