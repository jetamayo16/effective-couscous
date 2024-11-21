const puppeteer = require('puppeteer');
const percySnapshot = require('@percy/puppeteer');

describe('Percy test...', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false, slowMo: 200 });
        page = await browser.newPage();
    });

    test.only('Full page screenshot', async () => {
        await page.goto('https://www.exito.com/blackfriday');
        await page.waitForSelector('header');
        await percySnapshot(page, 'Black Friday Éxito'); 
    });

    afterAll(async () => {
        await browser.close();
    });
});
