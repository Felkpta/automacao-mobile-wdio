import { config as baseConfig } from './wdio.conf.js';

export const config = {
    ...baseConfig,
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: ['browserstack'],
    capabilities: [{
        platformName: 'android',
        'appium:platformVersion': '12.0',
        'appium:deviceName': 'Google Pixel 6',
        'appium:app': 'bs://sample.app', // ou o ID/app carregado no BrowserStack
        'appium:automationName': 'UiAutomator2'
    }]
};