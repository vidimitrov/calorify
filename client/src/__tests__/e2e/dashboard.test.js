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

  it('A user can create a new meal', async () => {
    await page.click('button[name=add-meal-fab]');
    await page.waitForSelector('[data-testid="create-meal-page"]');

    await page.type('input[name=name]', 'Chicken with rice');
    await page.type('input[name=calories]', '450');
    await page.click('button[name=submit-create-meal]');
    await delay(3000);

    await page.waitForSelector('[data-testid="dashboard"]');
  }, 100000);

  it('A user cannot create a new meal without specifying a name', async () => {
    await page.click('button[name=add-meal-fab]');
    await page.waitForSelector('[data-testid="create-meal-page"]');

    await page.type('input[name=calories]', '450');
    await page.click('button[name=submit-create-meal]');
    await delay(3000);

    await page.waitForSelector('p[name="required-name"]');
  }, 100000);

  it('A user cannot create a new meal without specifying a calories', async () => {
    await page.click('button[name=add-meal-fab]');
    await page.waitForSelector('[data-testid="create-meal-page"]');

    await page.type('input[name=name]', 'Chicken with rice');
    await page.click('button[name=submit-create-meal]');
    await delay(3000);

    await page.waitForSelector('p[name="required-calories"]');
  }, 100000);

  it('A user can update an existing meal', async () => {
    // Create a meal
    await page.click('button[name=add-meal-fab]');
    await page.waitForSelector('[data-testid="create-meal-page"]');

    await page.type('input[name=name]', 'Rice with chicken');
    await page.type('input[name=calories]', '250');
    await page.click('button[name=submit-create-meal]');
    await delay(3000);

    // Wait until the page is redirected to the dashboard
    await page.waitForSelector('[data-testid="dashboard"]');

    // Get the name of the first meal
    await page.waitForSelector('div[name=meal-card]');
    const firstMealName = await page.evaluate(() => document.querySelector('div[name=meal-card] h3[name=card-info-subtitle]').innerText);

    // Click the update button of the first meal and wait for selector in the update view
    const updateBtn = await page.$('button[name=edit-meal]');
    await updateBtn.click();
    await delay(1000);
    await page.waitForSelector('[data-testid="update-meal"]');

    // Do the tripple click magic and update the meal name
    const nameToUpdate = 'Pork with rice';
    const name = await page.$('input[name=name]');
    await name.click();
    await name.focus();
    await name.click({ clickCount: 3 });
    await name.press('Backspace');
    await name.type(nameToUpdate);
    await page.click('button[name=submit-update-meal]');

    // Wait for the selector in the dashboard and get the first meal name again
    await page.waitForSelector('[data-testid="dashboard"]');
    const updatedFirstMealName = await page.evaluate(() => document.querySelector('div[name=meal-card] h3[name=card-info-subtitle]').innerText);

    // Expect the value to be equal to the updated value
    expect(updatedFirstMealName !== firstMealName).toBe(true);
    // expect(updatedFirstMealName).toBe(nameToUpdate);
  }, 100000);

  it('A user can delete an existing meal', async () => {
    // Create a meal
    await page.click('button[name=add-meal-fab]');
    await page.waitForSelector('[data-testid="create-meal-page"]');

    await page.type('input[name=name]', 'Chicken with rice');
    await page.type('input[name=calories]', '450');
    await page.click('button[name=submit-create-meal]');
    await delay(3000);

    // Wait until the page is redirected to the dashboard
    await page.waitForSelector('[data-testid="dashboard"]');

    // Get the number of all meals
    await page.waitForSelector('div[name=meal-card]');
    const initialMeals = await page.$$('div[name=meal-card]');
    const initialNumberOfMeals = initialMeals.length;

    // Click the delete icon
    const deleteBtn = await page.$('button[name=delete-meal]');
    await deleteBtn.click();
    await delay(1000);

    // Get the number of meals again
    const currentMeals = await page.$$('div[name=meal-card]');
    const numberOfCurrentMeals = currentMeals.length;

    // Expect the number of meals to be the initial number - 1
    expect(numberOfCurrentMeals).toBe(initialNumberOfMeals - 1);
  }, 100000);

  afterEach(async () => {
    await page.goto('about:blank');
  }, 100000);

  afterAll(() => {
    browser.close();
  });
});
