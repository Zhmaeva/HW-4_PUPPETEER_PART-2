const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(5000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 0 });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(5000);
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
  });
});

When("user selects a date", async function () {
  return await clickElement(this.page, "a:nth-child(5)");
});

When("user selects the movie and time", async function () {
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='199']");
});

When("user selects a free seat", async function () {
  return await clickElement(this.page, ".buying-scheme__wrapper .buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
});

When("user selects a occupied seat", async function () {
  return await clickElement(this.page, ".buying-scheme__wrapper .buying-scheme__chair_taken");
});

When("user clicks on the book button", async function () {
  const nav = this.page.waitForNavigation({ timeout: 500 });
  await clickElement(this.page, "button.acceptin-button");
  await nav;
});

When("user clicks on the disabled book button", async function () {
  await clickElement(this.page, "button.acceptin-button");
});

When("user clicks on the get code button", async function () {
  const nav = this.page.waitForNavigation({ timeout: 500 });
  await clickElement(this.page, "button.acceptin-button");
  await nav;
});

Then("user get the code and text {string}", async function (expected) {
  const actual = await getText(this.page, "h2.ticket__check-title");
  expect(actual).contains(expected);
});

Then("reserve button is not active", async function () {
  const isDisabled = await this.page.$eval(".acceptin-button", (button) => {
    return button.disabled;
  });
  expect(isDisabled).equal(true);
});