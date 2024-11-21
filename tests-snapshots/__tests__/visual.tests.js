const puppeteer = require("puppeteer");
const { toMatchImageSnapshot } = require("jest-image-snapshot");
expect.extend({ toMatchImageSnapshot });

describe("Visual regression tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  test("Full page screenshot", async () => {
    await page.goto("https://www.exito.com");
    await page.waitForSelector("body");
    const image = await page.screenshot({ type: "png" });

    expect(Buffer.from(image)).toMatchImageSnapshot({
      failureThreshold: 500,
      failureThresholdType: "pixel",
    });
  });

  test("Captura algún elemento en específico", async () => {
    await page.goto("https://www.exito.com");
    const header = await page.waitForSelector("header");
    const image = await header.screenshot({ type: "png" });

    expect(Buffer.from(image)).toMatchImageSnapshot({
      failureThreshold: 500,
      failureThresholdType: "pixel",
    });
  });

  test("Captura de pantalla quitando elemento en específico", async () => {
    await page.goto("https://www.example.com");
    await page.evaluate(() => {
      (document.querySelectorAll("h1") || []).forEach((element) =>
        element.remove()
      );
    });
  });

  test("Galaxy Note 3 snapshot", async () => {
    await page.goto("https://www.exito.com");
    await page.emulate(puppeteer.KnownDevices["Galaxy Note 3 landscape"]);
    const header = await page.waitForSelector("body");
    const image = await header.screenshot({ type: "png" });
    expect(Buffer.from(image)).toMatchImageSnapshot({
      failureThreshold: 500,
      failureThresholdType: "pixel",
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});
