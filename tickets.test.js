const { expect } = require("chai");
const { clickElement, getText, ticketBooking } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(30000);
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Booking tickets on the website 'Идём в кино'", () => {
    const date = "a:nth-child(7)";
    const movie = ".movie-seances__time[href='#'][data-seance-id='199']";
    const vipChair = ".buying-scheme__wrapper .buying-scheme__chair_vip:not(.buying-scheme__chair_taken)";
    const standartChair = ".buying-scheme__wrapper .buying-scheme__chair_standart:not(.buying-scheme__chair_taken)";
    const blockedChair = ".buying-scheme__wrapper .buying-scheme__chair_taken";
    const title= "h2.ticket__check-title";
    const btn = ".acceptin-button";

  test("Successful booking of vip cinema ticket", async () => {
    await ticketBooking(page, date, movie, vipChair, btn);
    const successTitle = await getText(page, title);
    expect(successTitle).contain("Вы выбрали билеты:");
  });

  test("Successful booking of standart cinema ticket", async () => {
    await ticketBooking(page, date, movie, standartChair, btn);
    const acceptBtn = await getText(page, btn);
    expect(acceptBtn).contain("Получить код бронирования");
  });

  test("Should not reserve occupied seats", async () => {
    await ticketBooking(page, date, movie, standartChair, btn);
    await clickElement(page, btn);
    page.goto("https://qamid.tmweb.ru/client/index.php")
    await clickElement(page, date);
    await clickElement(page, movie);
    await clickElement(page, blockedChair);
    const isDisabled = await page.$eval(btn, (button) => {
      return button.disabled;
    });
    expect(isDisabled).equal(true);
  });
});

