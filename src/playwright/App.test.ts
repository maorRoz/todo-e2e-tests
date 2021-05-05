import { chromium, Browser, Page } from "playwright";

let browser: Browser;
let page: Page;

const buyMilk = "buy milk";

beforeAll(async () => {
  browser = await chromium.launch();
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
});

test(`add ${buyMilk}`, async () => {
  await page.fill("data-testid=item-input", buyMilk);

  await page.click("data-testid=button-submit");

  const itemContent = await page.textContent("data-testid=item-1");

  expect(itemContent).toBe(buyMilk);
});

test(`remove ${buyMilk}`, async () => {
  await page.fill("data-testid=item-input", buyMilk);

  await page.click("data-testid=button-submit");

  await page.click("data-testid=item-1");

  const itemContent = await page.$("data-testid=item-1");

  expect(itemContent).toBeNull();
});

test("add many", async () => {
  await page.fill("data-testid=item-input", "buy drinks");
  await page.click("data-testid=button-submit");
  await page.waitForSelector(`data-testid=item-1`);
  await page.fill("data-testid=item-input", "buy milk");
  await page.click("data-testid=button-submit");
  await page.waitForSelector(`data-testid=item-2`);
  await page.fill("data-testid=item-input", "buy sandwich");
  await page.click("data-testid=button-submit");
  await page.waitForSelector(`data-testid=item-3`);
});

test("remove many", async () => {
  await page.fill("data-testid=item-input", "buy drinks");
  await page.click("data-testid=button-submit");
  await page.waitForSelector(`data-testid=item-1`);
  await page.fill("data-testid=item-input", "buy milk");
  await page.click("data-testid=button-submit");
  await page.waitForSelector(`data-testid=item-2`);
  await page.fill("data-testid=item-input", "buy sandwich");
  await page.click("data-testid=button-submit");
  await page.waitForSelector(`data-testid=item-3`);

  await page.click("data-testid=item-1");
  await page.click("data-testid=item-2");
  await page.click("data-testid=item-3");

  const itemContent1 = await page.$("data-testid=item-1");
  const itemContent2 = await page.$("data-testid=item-2");
  const itemContent3 = await page.$("data-testid=item-3");

  expect(itemContent1).toBeNull();
  expect(itemContent2).toBeNull();
  expect(itemContent3).toBeNull();
});

afterAll(async () => {
  await browser.close();
});
