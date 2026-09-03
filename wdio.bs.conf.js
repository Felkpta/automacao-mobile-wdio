import { config as baseConfig } from './wdio.conf.js';

export const config = {
    ...baseConfig,
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            app: './app/native-demo-app.apk',
            testObservability: true
        }]
    ],
    capabilities: [{
        platformName: 'android',
        'appium:platformVersion': '12.0',
        'appium:deviceName': 'Google Pixel 6',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './app/native-demo-app.apk'
    }]
};