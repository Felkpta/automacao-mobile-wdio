import { config as baseConfig } from './wdio.conf.js';

export const config = {
    ...baseConfig,
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: ['browserstack'],
    
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Google Pixel 7',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.BROWSERSTACK_APP_ID,
        'bstack:options': {
            projectName: 'Automacao Mobile WDIO',
            buildName: 'CI Github Actions Build',
            sessionName: 'Mobile Integration Tests',
            debug: true,
            networkLogs: true
        }
    }]
};
