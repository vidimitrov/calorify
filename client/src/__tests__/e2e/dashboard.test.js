import puppeteer from 'puppeteer';
// import faker from 'faker';
import cfg from '../../../config';

function delay(time) {
  return new Promise(((resolve) => {
    setTimeout(resolve, time);
  }));
}

const { APP_URL } = cfg;
const LOGIN_DATA = {
  email: 'john@email.com',
  password: '123123',
};

describe('In the Dashboard flow', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch(
      {
        headless: true,
        // slowMo: 100,
      },
    );

    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto(`${APP_URL}/auth/login`);
    await page.waitForSelector('#login-form-content');
    await page.click('input[name=email]');
    await page.type('input[name=email]', LOGIN_DATA.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', LOGIN_DATA.password);
    await page.click('button[id=login-submit]');
    await page.waitForSelector('[data-testid="dashboard"]');
  }, 100000);

  it('A user can log out', async () => {
    await page.click('button[name=logout-button]');
    await page.waitForSelector('button[id=login-submit]');
  }, 100000);

  it('A user can update his account information (name, daily calories)', async () => {
    const newName = 'Some updated name';
    const newCalories = '320';

    await page.click('button[name=account-settings]');

    let name = await page.$('#name');
    await name.click();
    await name.focus();
    await name.click({ clickCount: 3 });
    await name.press('Backspace');
    await name.type(newName);

    let calories = await page.$('#calories');
    await calories.click();
    await calories.focus();
    await calories.click({ clickCount: 3 });
    await calories.press('Backspace');
    await calories.type(newCalories);

    await page.click('button[name=submit-account-update]');
    await delay(3000);

    name = await page.evaluate(sel => document.querySelector(sel).value, '#name');
    calories = await page.evaluate(sel => document.querySelector(sel).value, '#calories');

    expect(name).toEqual(newName);
    expect(calories).toEqual(newCalories);
  }, 100000);

  it('A user can create a new meal', async () => { }, 100000);

  it('A user cannot create a new meal without specifying name and calories', async () => { }, 100000);

  it('A user can update an existing meal', async () => { }, 100000);

  it('A user can delete an existing meal', async () => { }, 100000);

  afterEach(async () => {
    await page.goto('about:blank');
  }, 100000);

  afterAll(() => {
    browser.close();
  });
});
