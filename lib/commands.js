module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
  ticketBooking: async function (page, dateSelector, movieSelector, chairSelector, btnSelector) {
    try {
      await page.waitForSelector(dateSelector);
      await page.click(dateSelector);
      await page.waitForSelector(movieSelector);
      await page.click(movieSelector);
      await page.waitForSelector(chairSelector);
      await page.click(chairSelector);
      await page.waitForSelector(btnSelector);
      await page.click(btnSelector);
    } catch (error) {
      throw new Error(`Booking is not available for selector`);
    }
  }
};