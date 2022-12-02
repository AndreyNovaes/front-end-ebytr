import puppeteer from 'puppeteer';

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should create a new task', async () => {
    await page.goto('http://localhost:3000/');
    const searchButtonModalOpen = await page.$('.open-modal');
    // expect(searchButtonModalOpen).toBeTruthy();
  });

  afterAll(() => browser.close());
});
