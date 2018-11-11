import puppeteer from 'puppeteer';
import faker from 'faker';
import cfg from '../../../config';

const { APP_URL } = cfg;
const LOGIN_DATA = {
  email: 'john@email.com',
  password: '123123',
};
const SIGNUP_DATA = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  password: faker.random.word(),
};

describe('In the Authentication flow', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch(
      {
        headless: true,
        // slowMo: 250,
      },
    );

    page = await browser.newPage();
  });

  it('Attepts to access private routes if unauthorized, leads to redirect to login page', async () => {
    await page.goto(`${APP_URL}/`);
    await page.waitForSelector('button[id=login-submit]');
    await page.goto(`${APP_URL}/settings`);
    await page.waitForSelector('button[id=login-submit]');
    await page.goto(`${APP_URL}/create-meal`);
    await page.waitForSelector('button[id=login-submit]');
  }, 100000);

  it('A user can log in', async () => {
    await page.goto(`${APP_URL}/auth/login`);
    await page.waitForSelector('#login-form-content');
    await page.click('input[name=email]');
    await page.type('input[name=email]', LOGIN_DATA.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', LOGIN_DATA.password);
    await page.click('button[id=login-submit]');
    await page.waitForSelector('[data-testid="dashboard"]');
  }, 100000);

  it('A user cannot log in without email and password', async () => {
    await page.goto(`${APP_URL}/auth/login`);
    await page.waitForSelector('#login-form-content');
    await page.click('button[id=login-submit]');
    await page.waitForSelector('p[name="required-email"]');
    await page.waitForSelector('p[name="required-password"]');
  }, 100000);

  it('A user can sign up', async () => {
    await page.goto(`${APP_URL}/auth/signup`);
    await page.waitForSelector('#signup-form-content');
    await page.click('input[name=name]');
    await page.type('input[name=name]', SIGNUP_DATA.name);
    await page.click('input[name=email]');
    await page.type('input[name=email]', SIGNUP_DATA.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', SIGNUP_DATA.password);
    await page.click('input[name=repeat-password]');
    await page.type('input[name=repeat-password]', SIGNUP_DATA.password);
    await page.click('button[id=signup-submit]');
    await page.waitForSelector('[data-testid="dashboard"]');
  }, 100000);

  it('A user cannot sign up without a name, email and password', async () => {
    await page.goto(`${APP_URL}/auth/signup`);
    await page.waitForSelector('#signup-form-content');
    await page.click('button[id=signup-submit]');
    await page.waitForSelector('p[name="required-name"]');
    await page.waitForSelector('p[name="required-email"]');
    await page.waitForSelector('p[name="required-password"]');
  }, 100000);

  afterAll(() => {
    browser.close();
  });
});
